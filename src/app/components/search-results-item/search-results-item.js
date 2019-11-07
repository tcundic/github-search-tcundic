import React from 'react';
import { Link } from 'react-router-dom';

import './search-results-item.scss';

export function SearchResultsItem(props) {
    return (
        <div className="col-sm-3">
            <div className="card shadow">
                <img src={props.user.avatar_url} alt={props.user.login} />
                <div className="card-body">
                    <h5 className="card-title">{props.user.login}</h5>
                    <Link to="/user-profile">
                        <span onClick={() => props.onClick(props.user.login)} className="btn btn-primary visit-profile-btn">View profile</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
