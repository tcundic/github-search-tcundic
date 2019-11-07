import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const GITHUB_API = 'https://api.github.com';
const SEARCH_USERS_API = 'search/users?q=';
const SINGLE_USER_API = 'users/';

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
            const data = await axios.get(`${GITHUB_API}/${SINGLE_USER_API}${userId}`);
            return data;
        } catch(error) {
            console.error('Error while fetching user: ', error);
            return null;
        }
    }
}

export default GithubService;