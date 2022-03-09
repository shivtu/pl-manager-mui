import { IAppStateAction } from '../../utils/types';
import { AUTH_TOKEN, PROJECTS_DATA } from '../actions/action.types';

const initialState = {
  token: undefined,
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
    default:
      return state;
  }
}
