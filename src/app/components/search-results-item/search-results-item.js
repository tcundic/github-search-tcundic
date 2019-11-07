import React from 'react';
import './search-results-item.scss';

export function SearchResultsItem(props) {
    return (
        <div className="col-sm-3">
            <div className="card shadow">
                <img src={props.user.avatar_url} alt={props.user.login} />
                <div className="card-body">
                    <h5 className="card-title">{props.user.login}</h5>
                    <a href="#" className="btn btn-primary visit-profile-btn">View profile</a>
                </div>
            </div>
        </div>
    )
}
