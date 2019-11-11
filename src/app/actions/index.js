import { SEARCH_USERS, FETCH_USER, FETCH_REPOSITORIES } from './types';
import axios from 'axios';
require("babel-polyfill");

const GITHUB_API = 'https://api.github.com';
const SEARCH_USERS_API = `${GITHUB_API}/search/users`;
const SINGLE_USER_API = `${GITHUB_API}/users`;
const USER_REPOSITORIES_API = 'repos?per_page=100&page=';

export const findUser = (searchResults) => {
    return {
        type: SEARCH_USERS,
        searchResults
    }
};

export const findGithubUser = keyword => {
    const cachedQuery = localStorage.getItem(keyword);

    return (dispatch) => {
        if (cachedQuery) {
            return new Promise((resolve, reject) => {
                dispatch(findUser(JSON.parse(cachedQuery)));
                resolve(JSON.parse(cachedQuery));
            });
        } else {
            let searchResultsPromise = axios.get(`${SEARCH_USERS_API}?q=${keyword}&per_page=32`);

            searchResultsPromise.then(response => {
                localStorage.setItem(keyword, JSON.stringify(response.data.items));
            }).catch(err => {
                console.warn('Error while saving search results to local storage: ', err);
            });

            return searchResultsPromise.then(response => {
                dispatch(findUser(response.data.items));
            })
            .catch(err => {
                console.err('Error while search for user: ', err);
            });
        }
    };
};

export const getUser = (user) => {
    return {
        type: FETCH_USER,
        user
    }
};

export const getGithubUser = userId => {
    const cachedUser = localStorage.getItem(`user.${userId}`);

    return (dispatch) => {
        if (cachedUser) {
            return new Promise((resolve, reject) => {
                dispatch(getUser(JSON.parse(cachedUser)));
                resolve(JSON.parse(cachedUser));
            });
        } else {
            let userPromise = axios.get(`${SINGLE_USER_API}/${userId}`);

            userPromise.then(response => {
                localStorage.setItem(`user.${userId}`, JSON.stringify(response.data));
            }).catch(err => {
                console.warn('Error while saving user data to local storage: ', err);
            });

            return userPromise.then(response => {
                dispatch(getUser(response.data))
            })
            .catch(err => {
                console.error('Error while fetching user: ', err);
            });
        }
    };
};

export const getRepositories = (repositories) => {
    return {
        type: FETCH_REPOSITORIES,
        repositories
    }
};

export const getUserRepositories = userId => {
    const cachedRepositories = localStorage.getItem(`${userId}.repositories`);

    return (dispatch) => {
        if (cachedRepositories) {
            return new Promise((resolve, reject) => {
                dispatch(getRepositories(JSON.parse(cachedRepositories)));
                resolve(JSON.parse(cachedRepositories));
            });
        } else {
            let repositoriesPromise = getRepositoriesNextPage(userId, 1, []);

            repositoriesPromise.then(response => {
                localStorage.setItem(`${userId}.repositories`, JSON.stringify(response));
            }).catch(err => {
                console.warn('Error while saving repositories data to local storage: ', err);
            });

            return repositoriesPromise.then(response => {
                dispatch(getRepositories(response))
            })
            .catch(err => {
                console.error('Error while fetching repositories: ', err);
            });
        }
    };
};

/**
 * This recursive method retrieve repositories page after page, until result it gets is empty array,
 * and during each run it concatenate results with previous collected array.
 * 
 * @param {string} userId username of user
 * @param {number} pageNumber current retrieved page with results
 * @param {Array} repositoriesList Array with results so far
 * @returns promise with array of collected results so far
 */
async function getRepositoriesNextPage(userId, pageNumber, repositoriesList) {
    // retrieve repositories from page number
    return await axios.get(`${SINGLE_USER_API}/${userId}/${USER_REPOSITORIES_API}${pageNumber}`).then((response) => {
        if (response.data.length != 0) {
            // it still have repositories to retrieve
            return getRepositoriesNextPage(userId, ++pageNumber, repositoriesList.concat(response.data));
        } else {
            // previous page was last, return array with repositories
            return repositoriesList;
        }
    });
}