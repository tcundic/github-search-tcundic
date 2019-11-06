import React from 'react';
import './search-users-results.scss';
import { SearchResultsItem } from '../search-results-item/search-results-item';

export class SearchUsersResults extends React.Component {
    render() {
        return (
            <div className="page-content container search-results-container">
                <SearchResultsItem />
            </div>
        )
    }
}
