import React from 'react';

import GithubService from '../../services/github-search-service';
import './user-profile.scss';

export class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        GithubService.getUser(this.props.userId).then(response => {
            console.log(response);
            this.setState({
                user: response.data
            });
        }).catch(err => {
            console.error('Index.js, Error while search users: ', err);
        });
    }

    render() {
        return (
            <div className="user-profile container mt-5 mb-5">{(() => {
                if (this.state) {
                    return (
                        <div className="card shadow p-4">
                            <div className="row">
                                <div className="col-md-3 mr-3 profile-picture">
                                    <img src={this.state.user.avatar_url} />
                                </div>
                                <div className="col-md-8 profile-details">
                                    <div className="user-name">
                                        <h1>{this.state.user.name}</h1>
                                    </div>
                                    <div className="username-email">
                                        <h4><small className="mr-5">{`@${this.state.user.login}`}</small><small>{`${!!(this.state.user.email) ? this.state.user.email : 'Email not available'}`}</small></h4>
                                    </div>
                                    <div className="bio mt-2">
                                        {this.state.user.bio}
                                    </div>
                                    <div className="profile-buttons">
                                        <a href={this.state.user.html_url} target="_blank"><span className="btn btn-primary open-github-profile mr-3">Open Github profile</span></a>
                                        <span className="btn btn-primary open-github-profile">View repositories</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row user-numbers mt-5">
                                <div className="followers statistic-container mt-4 mb-4 right-vertical-divider">
                                    <div className="number">{this.state.user.followers}</div>
                                    <div className="caption">Followers</div>
                                </div>
                                <div className="following statistic-container mt-4 mb-4">
                                    <div className="number">{this.state.user.following}</div>
                                    <div className="caption">Following</div>
                                </div>
                                <div className="repositories statistic-container mt-4 mb-4 left-vertical-divider">
                                    <div className="number">{this.state.user.public_repos}</div>
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
