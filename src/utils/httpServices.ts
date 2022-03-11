import axios from 'axios';
import { axiosAsyncHandler } from '../utils/errorHandlers';

const DOMAIN = 'http://localhost:5000';
const BASE_URI = 'api/v1/pl-manager/peenya';
export const REST_API_SERVICES = {
  PROJECTS: {
    FIND: 'projects/find',
  },
  USERS: {
    LOGIN: 'users/login',
    ME: 'users/me',
  },
};

export const host = `${DOMAIN}/${BASE_URI}`;

export const fakeService = async (scriptletName: string, accessToken: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'get',
      })
  );

export const loginUser = async (userEmail: string, password: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        method: 'POST',
        url: `${host}/${REST_API_SERVICES.USERS.LOGIN}`,
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
        url: `${host}/${REST_API_SERVICES.USERS.ME}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  );
