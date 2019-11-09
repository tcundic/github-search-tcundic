import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const GITHUB_API = 'https://api.github.com';
const SEARCH_USERS_API = 'search/users?q=';
const SINGLE_USER_API = 'users';
const USER_REPOSITORIES_API = 'repos?per_page=100&page=';

/**
 * This module contains helper methods which communicate with Github API to retrieve data.
 */
const GithubService = {
    /**
     * Search all users with keyword.
     * 
     * @param {string} keyword search parameter
     * @returns promise with list of results
     */
    findUser: async function(keyword) {
        try {
            const data = await axios.get(`${GITHUB_API}/${SEARCH_USERS_API}${keyword}`);
            return data;
        } catch(error) {
            console.error('Error while fetching users: ', error);
            return null;
        }
    },

    /**
     * Get user with username {userId}.
     * 
     * @param {string} userId username of user
     * @returns promise with user Json object
     */
    getUser: async function(userId) {
        try {
            const data = await axios.get(`${GITHUB_API}/${SINGLE_USER_API}/${userId}`);
            return data;
        } catch(error) {
            console.error('Error while fetching user: ', error);
            return null;
        }
    },

    /**
     * This method retrieve all repositories of specific user.
     * 
     * @param {string} userId username of user
     * @returns promise with list of all repositories
     */
    getUserRepositories: async function(userId) {
        try {
            // retrieve first page of results (Githup API returns up to 100 results per networ request)
            // and concatenate results to Array
            return getRepositoriesNextPage(userId, 1, []);
        } catch(error) {
            console.error('Error while fetching users: ', error);
            return null;
        }
    },
}

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
    return await axios.get(`${GITHUB_API}/${SINGLE_USER_API}/${userId}/${USER_REPOSITORIES_API}${pageNumber}`).then((response) => {
        if (response.data.length != 0) {
            // it still have repositories to retrieve
            return getRepositoriesNextPage(userId, ++pageNumber, repositoriesList.concat(response.data));
        } else {
            // previous page was last, return array with repositories
            return repositoriesList;
        }
    });
}

export default GithubService;