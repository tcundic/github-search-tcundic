import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const GITHUB_API = 'https://api.github.com';
const SEARCH_USERS_API = 'search/users?q=';

const GithubService = {
    findUser: async function(keyword) {
        try {
            const data = await axios.get(`${GITHUB_API}/${SEARCH_USERS_API}${keyword}`)
            return data;
        } catch(error) {
            console.error('Error while fetching users: ', error);
            return null;
        }
    }
}

export default GithubService;