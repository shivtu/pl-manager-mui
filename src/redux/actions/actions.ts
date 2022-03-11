import { IAppState, IProjectResponseData } from '../../utils/types';
import { AUTH_TOKEN, PROJECTS_DATA } from './action.types';

export const updateAuthToken = (token: string) => ({
  type: AUTH_TOKEN,
  payload: { token },
});

export const updateProjects = (projects: IProjectResponseData[]) => ({
  type: PROJECTS_DATA,
  payload: { projects },
});
