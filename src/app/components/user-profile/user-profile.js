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
            <div>{(() => {
                if (this.state) {
                    return this.state.user.name
                }
                })()}</div>
        )
    }
}
