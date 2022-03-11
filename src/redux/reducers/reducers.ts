import { IAppState, IAppStateAction } from '../../utils/types';
import {
  AUTH_TOKEN,
  PROJECTS_DATA,
  CURRENT_USER_PROFILE,
} from '../actions/action.types';

const initialState: IAppState = {
  token: undefined,
  loggedInUser: undefined,
  projects: [],
  designs: [],
};

export default function reducers(
  state = initialState,
  action: IAppStateAction
) {
  switch (action.type) {
    case AUTH_TOKEN:
      return { ...state, ...{ token: action.payload.token } };
    case PROJECTS_DATA:
      return { ...state, ...{ projects: action.payload.projects } };
    case CURRENT_USER_PROFILE:
      return {
        ...state,
        ...{ loggedInUser: action.payload.loggedInUser },
      };
    default:
      return initialState;
  }
}
