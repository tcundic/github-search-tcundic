import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';
import { SearchBar } from './components/search-bar/search-bar';
import { SearchUsersResults } from './components/search-users-results/search-users-results';

class App extends React.Component {
    render() {
        return (
            <div className="body">
                <SearchBar />
                <div className="page-content page-content--full">
                    <SearchUsersResults />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));