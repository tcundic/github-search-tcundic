import React from 'react';

import GithubService from '../../services/github-search-service';
import './repositories-list.scss';

export class RepositoriesList extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.userId != null) {
            GithubService.getUserRepositories(this.props.userId).then(response => {
                console.log(response);
                this.setState({
                    repositories: response.data
                });
            }).catch(err => {
                console.error('Index.js, Error while search users: ', err);
            });
        }
    }

    render() {
        return (
            <div className="">
                repositories list
            </div>
        )
    }
}

