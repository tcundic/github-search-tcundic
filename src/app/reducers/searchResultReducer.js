import { SEARCH_USERS } from '../actions/types';

export default function searchResultReducer(state = [], action) {
    switch (action.type) {
        case SEARCH_USERS:
            return action.searchResults;
        default:
            return state;
    }
}
