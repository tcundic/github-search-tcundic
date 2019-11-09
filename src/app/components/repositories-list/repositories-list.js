import React from 'react';
import { MDBDataTable } from 'mdbreact'

import './repositories-list.scss';

export class RepositoriesList extends React.Component {
    /**
     * This method convert string date to Date object and format it.
     * 
     * @param {string} date Date when repository is created
     */
    formatDate(date) {
        let d = new Date(date);

        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    render() {
        let items = [];

        const data = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc',
                },
                {
                    label: 'Language',
                    field: 'language',
                    sort: 'asc',
                },
                {
                    label: 'Created on',
                    field: 'created_at',
                },
                {
                    label: 'View repository',
                    field: 'html_url',
                }
            ],
            rows: []
        };

        if (this.props.repositories) {
            this.props.repositories.map((repo) => {
                items.push(
                    {
                        name: repo.full_name,
                        description: repo.description !== null ? repo.description : <em>No description</em>,
                        language: repo.language !== null ? repo.language : <em>No language specified</em>,
                        created_at: this.formatDate(repo.created_at),
                        html_url: <a href={repo.html_url} target="_blank"><span className="btn btn-primary open-repository-btn">Open repository</span></a>
                    }
                );
            });

            data.rows = items;

        }

        return (
            <div className="repositories-table-container container mt-4 mb-5">
                <h1>{`${!!(this.props.user) ? this.props.user.name + ' repositories' : ''}`}</h1>
                <MDBDataTable
                    striped
                    bordered
                    data={data} />
            </div>
        )
    }
}

