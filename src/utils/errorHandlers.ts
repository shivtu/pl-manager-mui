export const axiosAsyncHandler = async (fn: any) => {
  try {
    const res = await Promise.resolve(fn());
    return res;
  } catch (error: any) {
    return error.response;
  }
};
