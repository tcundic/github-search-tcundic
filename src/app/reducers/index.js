import { combineReducers } from 'redux';
import user from './userReducer';
import repositories from './repositoryReduces';
import searchResults from './searchResultReducer';

export default combineReducers({
    user: user,
    searchResults: searchResults,
    repositories: repositories
});