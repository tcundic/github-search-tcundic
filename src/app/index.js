import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

import './index.scss';
import { Spinner } from './components/loading-spinner/loading-spinner';
import { SearchBar } from './components/search-bar/search-bar';
import { SearchUsersResults } from './components/search-users-results/search-users-results';
import { UserProfile } from './components/user-profile/user-profile';
import { RepositoriesList } from './components/repositories-list/repositories-list';
import GithubService from './services/github-search-service';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchKeyword: '',
            searchResults: null,
            user: null,
            repositories: null,
        };

        this.onSearchKeywordChange = this.onSearchKeywordChange.bind(this);
        this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
        this.onProfileVisit = this.onProfileVisit.bind(this);
        this.onRepositoriesPageVisit = this.onRepositoriesPageVisit.bind(this);
    }

    onSearchKeywordChange(e) {
        this.setState({
            searchKeyword: e.target.value
        });

    }

    onSearchBtnClick() {
        const cachedQuery = localStorage.getItem(this.state.searchKeyword);
        this.setState({
            searchResults: null
        });

        if (cachedQuery) {
            this.setState({
                searchResults: JSON.parse(cachedQuery),
                searchKeyword: ''
            });
        } else {
            trackPromise(
                GithubService.findUser(this.state.searchKeyword).then(response => {
                    localStorage.setItem(this.state.searchKeyword, JSON.stringify(response.data.items));

                    this.setState({
                        searchResults: response.data.items,
                        searchKeyword: ''
                    });
                }).catch(err => {
                    console.error('Index.js, Error while searching users: ', err);
                })
            );
        }
    }

    onProfileVisit(userId) {
        const cachedUser = localStorage.getItem(`user.${userId}`);
        this.setState({
            user: null
        });

        if (cachedUser) {
            this.setState({
                user: JSON.parse(cachedUser)
            });
        } else {
            trackPromise(
                GithubService.getUser(userId).then(response => {
                    localStorage.setItem(`user.${userId}`, JSON.stringify(response.data));

                    this.setState({
                        user: response.data
                    });
                }).catch(err => {
                    console.error('Index.js, Error while getting user data: ', err);
                })
            );
        }
    }

    onRepositoriesPageVisit() {
        const cachedRepositories = localStorage.getItem(`${this.state.user.login}.repositories`);
        this.setState({
            repositories: []
        });

        if (cachedRepositories) {
            this.setState({
                repositories: JSON.parse(cachedRepositories)
            });
        } else {
            trackPromise(
                GithubService.getUserRepositories(this.state.user.login).then(response => {
                    localStorage.setItem(`${this.state.user.login}.repositories`, JSON.stringify(response));

                    this.setState({
                        repositories: response
                    });
                }).catch(err => {
                    console.error('Index.js, Error while getting user repositories: ', err);
                })
            );
        }
    }

    render() {
        const query = new URLSearchParams(location.search);

        return (
            <BrowserRouter>
                <div className="body">
                    <SearchBar keyword={this.state.searchKeyword} onChange={(keyword) => this.onSearchKeywordChange(keyword)} onClick={() => this.onSearchBtnClick()}/>
                    <div className="page-content page-content--full">
                        <Switch>
                            <Route
                                path='/'
                                exact
                                render={() => <SearchUsersResults searchResults={this.state.searchResults} onClick={(userId) => this.onProfileVisit(userId)}/>}
                            />
                            <Route
                                path='/user-profile'
                                render={() => <UserProfile user={this.state.user} onClick={() => this.onRepositoriesPageVisit()}/>}
                            />
                            <Route
                                path='/repositories'
                                render={() => <RepositoriesList user={this.state.user} repositories={this.state.repositories}/>}
                            />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <div>
        <App />
        <Spinner />
    </div>, document.getElementById('root'));