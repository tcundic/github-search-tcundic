import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const GITHUB_API = 'https://api.github.com';
const SEARCH_USERS_API = 'search/users?q=';
const SINGLE_USER_API = 'users';
const USER_REPOSITORIES_API = 'repos?per_page=100&page=';

const GithubService = {
    findUser: async function(keyword) {
        try {
            const data = await axios.get(`${GITHUB_API}/${SEARCH_USERS_API}${keyword}`);
            return data;
        } catch(error) {
            console.error('Error while fetching users: ', error);
            return null;
        }
    },

    getUser: async function(userId) {
        try {
            const data = await axios.get(`${GITHUB_API}/${SINGLE_USER_API}/${userId}`);
            return data;
        } catch(error) {
            console.error('Error while fetching user: ', error);
            return null;
        }
    },

    getUserRepositories: async function(userId) {
        try {
            return getRepositoriesNextPage(userId, 1, []);
        } catch(error) {
            console.error('Error while fetching users: ', error);
            return null;
        }
    },
}

async function getRepositoriesNextPage(userId, pageNumber, repositoriesList) {
    return await axios.get(`${GITHUB_API}/${SINGLE_USER_API}/${userId}/${USER_REPOSITORIES_API}${pageNumber}`).then((response) => {
        if (response.data.length != 0) {
            return getRepositoriesNextPage(userId, ++pageNumber, repositoriesList.concat(response.data));
        } else {
            return repositoriesList;
        }
    });
}

export default GithubService;