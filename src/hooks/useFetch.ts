import { useEffect, useState } from 'react';
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

const useFetch = (
  url: string | undefined,
  method: 'get' | 'post' | 'put' | 'delete',
  headers: AxiosRequestHeaders,
  data?: any
) => {
  const [result, setResult] = useState<AxiosResponse<any, any>>();
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
        setResult(res);
        setError(null);
      })
      .catch((err) => {
        setResult(undefined);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url, method]);

  return { loading, result, error };
};

export default useFetch;
