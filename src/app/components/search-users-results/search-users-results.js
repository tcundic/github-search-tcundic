import React from 'react';
import './search-users-results.scss';
import { SearchResultsItem } from '../search-results-item/search-results-item';

export function SearchUsersResults() {
    return (
        <div className="page-content container search-results-container">
            <SearchResultsItem />
        </div>
    )
}
