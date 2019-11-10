import React from 'react';
import { Link } from 'react-router-dom';

import './search-results-item.scss';

export const SearchResultsItem = ({user, onClick}) => {
    return (
        <div className="col-sm-3">
            <div className="card shadow">
                <img src={user.avatar_url} alt={user.login} />
                <div className="card-body">
                    <h5 className="card-title">{user.login}</h5>
                    <Link to="/user-profile">
                        <span onClick={() => onClick(user.login)} className="btn btn-primary visit-profile-btn">View profile</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
