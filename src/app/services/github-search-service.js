import axios from 'axios';

const GITHUB_API = 'https://api.github.com';
const SEARCH_USERS_API = 'search/users?q=';

const GithubService = {
    findUser: function(keyword) {
        axios.get(`${GITHUB_API}/${SEARCH_USERS_API}${keyword}`).then(resp => {
            console.log(resp.data);
        });
    }
}

export default GithubService;