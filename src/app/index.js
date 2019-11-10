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

    /**
     * This method is called when user type into search bar.
     * 
     * @param {click event} e 
     */
    onSearchKeywordChange(e) {
        this.setState({
            searchKeyword: e.target.value
        });

    }

    /**
     * This method is called when user click search button.
     * It looks for cached results, and in case if doesn't have them cached,
     * call service for retrieving search results.
     */
    onSearchBtnClick() {
        const cachedQuery = localStorage.getItem(this.state.searchKeyword);
        this.setState({
            searchResults: null
        });

        // Check if there is already same query cached...
        if (cachedQuery) {
            this.setState({
                searchResults: JSON.parse(cachedQuery),
                searchKeyword: ''
            });
        } else {
            // ...no cache, then make GET request, and in meantime show loading animation.
            // After getting results store data to local cache.
            let searchResultsPromise = GithubService.findUser(this.state.searchKeyword);

            trackPromise(
                searchResultsPromise.then(response => {
                    this.setState({
                        searchResults: response.data.items,
                    });
                }).catch(err => {
                    console.error('Index.js, Error while searching users: ', err);
                })
            );

            searchResultsPromise.then(response => {
                localStorage.setItem(this.state.searchKeyword, JSON.stringify(response.data.items));

                this.setState({
                    searchKeyword: ''
                });
            }).catch(err => {
                console.warn('Index.js, Error while saving search results to local storage: ', err);
            });
        }
    }

    /**
     * This method is called when user click on "View profile" button on search results page.
     * It retrieve complete data about user, from local cache or by GET request to Github API.
     * 
     * @param {user name of user} userId 
     */
    onProfileVisit(userId) {
        const cachedUser = localStorage.getItem(`user.${userId}`);
        this.setState({
            user: null,
            searchResults: null
        });

        if (cachedUser) {
            this.setState({
                user: JSON.parse(cachedUser)
            });
        } else {
            let userPromise = GithubService.getUser(userId);

            trackPromise(
                userPromise.then(response => {
                    this.setState({
                        user: response.data
                    });
                }).catch(err => {
                    console.error('Index.js, Error while getting user data: ', err);
                })
            );

            userPromise.then(response => {
                localStorage.setItem(`user.${userId}`, JSON.stringify(response.data));
            }).catch(err => {
                console.warn('Index.js, Error while saving user data to local storage: ', err);
            });
        }
    }

    /**
     * This method is called when user view repositories page, from user profile page.
     * We don't need here any function parameter, because we have user id saved in App component state.
     * It retrieve list of all repositories from user.
     */
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
            let repositoriesPromise = GithubService.getUserRepositories(this.state.user.login);

            trackPromise(
                repositoriesPromise.then(response => {
                    this.setState({
                        repositories: response
                    });
                }).catch(err => {
                    console.error('Index.js, Error while getting user repositories: ', err);
                })
            );

            repositoriesPromise.then(response => {
                localStorage.setItem(`${this.state.user.login}.repositories`, JSON.stringify(response));
            }).catch(err => {
                console.warn('Index.js, Error while saving repositories data to local storage: ', err);
            });
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