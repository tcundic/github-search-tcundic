import React from 'react';
import './search-users-results.scss';
import { SearchResultsItem } from '../search-results-item/search-results-item';

export class SearchUsersResults extends React.Component {
    render() {
        let items = [];

        if (this.props.searchResults) {
            this.props.searchResults.map((user) => {
                items.push(<SearchResultsItem key={user.id} user={user} onClick={(userId) => this.props.onClick(userId)} />);
            });

            if (this.props.searchResults.length == 0) {
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
}
