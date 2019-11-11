import { FETCH_REPOSITORIES } from '../actions/types'

export default function repositoryReducer(state = [], action) {
    switch (action.type) {
        case FETCH_REPOSITORIES:
            return action.repositories;
        default:
            return state;
    }
}