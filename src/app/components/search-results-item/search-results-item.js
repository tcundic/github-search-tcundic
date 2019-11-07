import React from 'react';
import './search-results-item.scss';

export function SearchResultsItem(props) {
    return (
        <div className="results">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card shadow flex-row flex-wrap">
                        <div className="card-header border-0">
                            <img src={props.user.avatar_url} alt={props.user.login} />
                        </div>
                        <div className="card-body d-flex flex-column align-items-start">
                            <h5 className="card-title">{props.user.login}</h5>
                            <a href="#" className="btn btn-primary visit-profile-btn">View profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
