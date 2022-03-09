import { IAppState } from '../../utils/types';
import { AUTH_TOKEN, PROJECTS_DATA } from './action.types';

export const updateAuthToken = (token: string) => ({
  type: AUTH_TOKEN,
  payload: { token },
});

export const updateProjects = (projects: IAppState) => ({
  type: PROJECTS_DATA,
  payload: { projects },
});
