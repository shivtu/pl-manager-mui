export const axiosAsyncHandler = async (fn: any) => {
  try {
    const res = await Promise.resolve(fn());
    return res;
  } catch (error: any) {
    if (error.response.status === 401) {
      // handle re-login
    }
    return error.response;
  }
};
