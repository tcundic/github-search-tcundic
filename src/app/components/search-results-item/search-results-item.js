import React from 'react';
import { Link } from 'react-router-dom';

import './search-results-item.scss';

export const SearchResultsItem = ({user : {avatar_url, login}, onClick}) => {
    return (
        <div className="col-sm-3">
            <div className="card shadow">
                <img src={avatar_url} alt={login} />
                <div className="card-body">
                    <h5 className="card-title">{login}</h5>
                    <Link to="/user-profile">
                        <span onClick={() => onClick(login)} className="btn btn-primary visit-profile-btn">View profile</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
