import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.scss';
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
            userId: null
        };

        this.onSearchKeywordChange = this.onSearchKeywordChange.bind(this);
        this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
    }

    onSearchKeywordChange(e) {
        this.setState({
            searchKeyword: e.target.value
        });

    }

    onSearchBtnClick() {
        this.setState({
            searchResults: null
        });

        GithubService.findUser(this.state.searchKeyword).then(response => {
            this.setState({
                searchResults: response.data.items,
                searchKeyword: ''
            });
        }).catch(err => {
            console.error('Index.js, Error while search users: ', err);
        });
    }

    onProfileVisit(userId) {
        this.setState({
            userId: userId
        });
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
                                render={() => <UserProfile userId={this.state.userId}/>}
                            />
                            <Route
                                path='/repositories'
                                render={() => <RepositoriesList />}
                            />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));