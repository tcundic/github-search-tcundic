import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './index.scss';
import { Spinner } from './components/loading-spinner/loading-spinner';
import { SearchBar } from './components/search-bar/search-bar';
import SearchUsersResults from './components/search-users-results/search-users-results';
import UserProfile from './components/user-profile/user-profile';
import RepositoriesList from './components/repositories-list/repositories-list';

import rootReducer from './reducers';
import { findGithubUser, getGithubUser, getUserRepositories } from './actions/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
    state = {
        searchKeyword: '',
        repositories: null,
    };

    /**
     * This method is called when user type into search bar.
     * 
     * @param {click event} e 
     */
    onSearchKeywordChange = (e) => {
        this.setState({
            searchKeyword: e.target.value
        });
    }

    onSearchBtnClick = () => {
        trackPromise(
            store.dispatch(findGithubUser(this.state.searchKeyword))
        );

        this.setState({
            searchKeyword: ''
        });
    }

    onProfileVisit = userId => {
        trackPromise(
            store.dispatch(getGithubUser(userId))
        );
    }

    onRepositoriesPageVisit = userId => {
        trackPromise(
            store.dispatch(getUserRepositories(userId))
        );
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
                                render={() => <SearchUsersResults onClick={userId => this.onProfileVisit(userId)}/>}
                            />
                            <Route
                                path='/user-profile'
                                render={() => <UserProfile onClick={userId => this.onRepositoriesPageVisit(userId)}/>}
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

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
            <Spinner />
        </Provider>
    </div>, document.getElementById('root'));