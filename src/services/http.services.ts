import axios from 'axios';
import {
  ICreateUserPayload,
  ICreateUserProfilePayload,
  INewProjectData,
} from '../utils/types';
import { axiosAsyncHandler } from '../utils/errorHandlers';

const DOMAIN = 'http://localhost:5000';
const BASE_URI = 'api/v1/pl-manager/peenya';
export const REST_API_SERVICES = {
  PROJECTS: {
    FIND: 'projects/find',
    FIND_TASKS: 'projects/find/tasks',
    CREATE: 'projects/create',
  },
  AUTH: {
    LOGIN: 'auth/login',
    ME: 'auth/me',
  },
  USERS: {
    PROFILE_ME: 'users/profile/me',
    PROFILES: 'users/profiles',
    UPDATE_PASSWORD: 'public/password/reset',
    CREATE_PROFILE: 'users/profile/create',
    CREATE_USER: 'users/create',
  },
  DESIGNS: {
    FIND: 'designs/find',
  },
  PUBLIC: {
    ROLES_ACCESS: 'public/roles-access',
  },
};

export const host = `${DOMAIN}/${BASE_URI}`;

export const loginUser = async (userEmail: string, password: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'POST',
        url: `${host}/${REST_API_SERVICES.AUTH.LOGIN}`,
        data: { userEmail, password },
        headers: {
          'Content-Type': 'application/json',
        },
      })
  );

export const getMe = async (token: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'GET',
        url: `${host}/${REST_API_SERVICES.AUTH.ME}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  );

export const getCurrentUserProfile = async (token: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'GET',
        url: `${host}/${REST_API_SERVICES.USERS.PROFILE_ME}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  );

export const createNewProject = async (
  token: string,
  newProjectData: INewProjectData
) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'POST',
        url: `${host}/${REST_API_SERVICES.PROJECTS.CREATE}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: newProjectData,
      })
  );

export const getDesignTaskForProject = async (
  token: string,
  projectId: string
) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'GET',
        url: `${host}/${REST_API_SERVICES.DESIGNS.FIND}?parentProjectId=${projectId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  );

export const getUserProfiles = async (token: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'GET',
        url: `${host}/${REST_API_SERVICES.USERS.PROFILES}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  );

export const getProjectTasks = async (token: string, projectId: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'GET',
        url: `${host}/${REST_API_SERVICES.PROJECTS.FIND_TASKS}/${projectId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  );

export const getIncompleteDesignTaks = async (token: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'GET',
        url: `${host}/${REST_API_SERVICES.DESIGNS.FIND}?status[$ne]=Completed`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  );

export const getIncompleteProjects = async (token: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'GET',
        url: `${host}/${REST_API_SERVICES.PROJECTS.FIND}?status[$ne]=Completed`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  );

export const updateUserPassword = (passwordResetData: {
  userEmail: string;
  currentPassword: string;
  password: string;
}) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'post',
        url: `${host}/${REST_API_SERVICES.USERS.UPDATE_PASSWORD}`,
        data: passwordResetData,
      })
  );

export const getRolesAndAccessList = () =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'get',
        url: `${host}/${REST_API_SERVICES.PUBLIC.ROLES_ACCESS}`,
      })
  );

export const createUserProfile = (
  token: string,
  userDetails: ICreateUserProfilePayload
) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'post',
        url: `${host}/${REST_API_SERVICES.USERS.CREATE_PROFILE}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: userDetails,
      })
  );

export const createUser = (token: string, userData: ICreateUserPayload) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'post',
        url: `${host}/${REST_API_SERVICES.USERS.CREATE_USER}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: userData,
      })
  );
