import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parse } from 'querystring';

import './index.scss';
import { SearchBar } from './components/search-bar/search-bar';
import { SearchUsersResults } from './components/search-users-results/search-users-results';
import GithubService from './services/github-search-service';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            searchResults: null
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
        GithubService.findUser(this.state.searchKeyword).then(response => {
            this.setState({
                searchResults: response.data.items
            });
        });
    }

    render() {
        const query = new URLSearchParams(location.search);

        return (
            <div className="body">
                <SearchBar keyword={this.state.searchKeyword} onChange={(keyword) => this.onSearchKeywordChange(keyword)} onClick={() => this.onSearchBtnClick()}/>
                <div className="page-content page-content--full">
                    <SearchUsersResults searchResults={this.state.searchResults} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));