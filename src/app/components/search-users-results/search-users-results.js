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
