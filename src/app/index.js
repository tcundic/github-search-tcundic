import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parse } from 'querystring';

import './index.scss';
import { SearchBar } from './components/search-bar/search-bar';
import { SearchUsersResults } from './components/search-users-results/search-users-results';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: ''
        };

        this.onSearchKeywordChange = this.onSearchKeywordChange.bind(this);
        this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
    }

    onSearchKeywordChange(e) {
        this.setState({
            searchKeyword: e.target.value
        });

        console.log('Tipk tipk');
    }

    onSearchBtnClick() {
        console.log('Clicketi');
    }

    render() {
        const query = new URLSearchParams(location.search);

        return (
            <div className="body">
                <SearchBar keyword={this.state.searchKeyword} onChange={(keyword) => this.onSearchKeywordChange(keyword)} onClick={() => this.onSearchBtnClick()}/>
                <div className="page-content page-content--full">
                    <SearchUsersResults />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));