import { useEffect, useState } from 'react';
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

const useFetch = (
  url: string | undefined,
  method: 'get' | 'post' | 'put' | 'delete',
  headers: AxiosRequestHeaders,
  data?: any
) => {
  const [response, setResponse] = useState<AxiosResponse<any, any>>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      url: url,
      method: method,
      headers: headers,
      data: data,
    })
      .then((res) => {
        setResponse(res);
        setError(null);
      })
      .catch((err) => {
        setResponse(undefined);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url, method]);

  return { loading, response, error };
};

export default useFetch;
