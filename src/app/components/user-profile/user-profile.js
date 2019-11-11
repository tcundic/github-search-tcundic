import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './user-profile.scss';

const UserProfile = ({user, onClick}) => {
    let userProfile = null;

    if (user) {
        userProfile = (
            <div className="card shadow p-4">
                <div className="row">
                    <div className="col-md-3 mr-3 profile-picture">
                        <img src={user.avatar_url} />
                    </div>
                    <div className="col-md-8 profile-details">
                        <div className="user-name">
                            <h1>{user.name}</h1>
                        </div>
                        <div className="username-email">
                            <h4><small className="mr-5">{`@${user.login}`}</small><small>{`${!!(user.email) ? user.email : 'Email not available'}`}</small></h4>
                        </div>
                        <div className="bio mt-2">
                            {user.bio}
                        </div>
                        <div className="profile-buttons">
                            <a href={user.html_url} target="_blank"><span className="btn btn-primary open-github-profile mr-3">Open Github profile</span></a>
                            <Link to="/repositories">
                                <span onClick={() => onClick(user.login)} className="btn btn-primary open-github-profile">View repositories</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row user-numbers mt-5">
                    <div className="followers statistic-container mt-4 bold mb-4 right-vertical-divider">
                        <div className="number">{user.followers}</div>
                        <div className="caption">Followers</div>
                    </div>
                    <div className="following statistic-container bold mt-4 mb-4">
                        <div className="number">{user.following}</div>
                        <div className="caption">Following</div>
                    </div>
                    <div className="repositories statistic-container bold mt-4 mb-4 left-vertical-divider">
                        <div className="number">{user.public_repos}</div>
                        <div className="caption">Repositories</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="user-profile container mt-4 mb-5">
            {userProfile}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(UserProfile);