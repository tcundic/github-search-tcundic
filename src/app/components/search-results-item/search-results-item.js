import React from 'react';
import './search-results-item.scss';

export function SearchResultsItem() {
    return (
        <div className="results">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">props.user.login</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">View profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
