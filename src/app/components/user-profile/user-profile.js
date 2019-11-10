import React from 'react';
import { Link } from 'react-router-dom';

import GithubService from '../../services/github-search-service';
import './user-profile.scss';

export class UserProfile extends React.Component {
    render() {
        return (
            <div className="user-profile container mt-4 mb-5">{(() => {
                if (this.props.user) {
                    return (
                        <div className="card shadow p-4">
                            <div className="row">
                                <div className="col-md-3 mr-3 profile-picture">
                                    <img src={this.props.user.avatar_url} />
                                </div>
                                <div className="col-md-8 profile-details">
                                    <div className="user-name">
                                        <h1>{this.props.user.name}</h1>
                                    </div>
                                    <div className="username-email">
                                        <h4><small className="mr-5">{`@${this.props.user.login}`}</small><small>{`${!!(this.props.user.email) ? this.props.user.email : 'Email not available'}`}</small></h4>
                                    </div>
                                    <div className="bio mt-2">
                                        {this.props.user.bio}
                                    </div>
                                    <div className="profile-buttons">
                                        <a href={this.props.user.html_url} target="_blank"><span className="btn btn-primary open-github-profile mr-3">Open Github profile</span></a>
                                        <Link to="/repositories">
                                            <span onClick={() => this.props.onClick()} className="btn btn-primary open-github-profile">View repositories</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row user-numbers mt-5">
                                <div className="followers statistic-container mt-4 mb-4 right-vertical-divider">
                                    <div className="number">{this.props.user.followers}</div>
                                    <div className="caption">Followers</div>
                                </div>
                                <div className="following statistic-container bold mt-4 mb-4">
                                    <div className="number">{this.props.user.following}</div>
                                    <div className="caption">Following</div>
                                </div>
                                <div className="repositories statistic-container mt-4 mb-4 left-vertical-divider">
                                    <div className="number">{this.props.user.public_repos}</div>
                                    <div className="caption">Repositories</div>
                                </div>
                            </div>
                        </div>
                    )
                }
                })()}</div>
        )
    }
}
