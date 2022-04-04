import { IAppState, IDesign, ILoggedInUser } from '../../utils/types';
import {
  AUTH_TOKEN,
  CURRENT_USER_PROFILE,
  PENDING_DESIGNS,
  PROJECTS_DATA,
} from './action.types';

export const updateAuthToken = (token: string) => ({
  type: AUTH_TOKEN,
  payload: { token },
});

export const updateLoggedInUser = (loggedInUser: ILoggedInUser) => ({
  type: CURRENT_USER_PROFILE,
  payload: { loggedInUser },
});

export const updateProjects = (projects: IAppState) => ({
  type: PROJECTS_DATA,
  payload: { projects },
});

export const updateProjectDesigns = (designs: IAppState) => ({
  type: PENDING_DESIGNS,
  payload: { designs },
});
