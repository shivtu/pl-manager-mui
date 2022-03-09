import axios from 'axios';
import { axiosAsyncHandler } from '../utils/errorHandlers';

export const baseURI = 'https://localhost:3000/api/v1';
export const getCurrentUserURI = 'me';
export const getScriptlet = 'get_scriptlet';

export const fakeService = async () => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return result;
};

export const getExe = async (scriptletName: string, accessToken: string) =>
  axiosAsyncHandler(
    async () =>
      await axios({
        url: `${baseURI}/${getScriptlet}/${scriptletName}`,
        method: 'get',
        headers: { Authorization: `Bearer ${accessToken}` },
      })
  );
