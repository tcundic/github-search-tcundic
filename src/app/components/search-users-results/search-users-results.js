import React from 'react';
import './search-users-results.scss';
import { SearchResultsItem } from '../search-results-item/search-results-item';

export const SearchUsersResults = ({searchResults, onClick}) => {
    let items = [];

    if (searchResults) {
        searchResults.map((user) => {
            items.push(<SearchResultsItem key={user.id} user={user} onClick={(userId) => onClick(userId)} />);
        });

        if (searchResults.length == 0) {
            items.push(<em className="no-results" key="0">No results</em>);
        }
    }

    return (
        <div className="page-content container search-results-container">
            <div className="row">
                {items}
            </div>
        </div>
    )
}
