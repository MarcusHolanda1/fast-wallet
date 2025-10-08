import { useCallback, useEffect, useState } from 'react';

type useAppQueryReturn<Data> = {
  data?: Data;
  isLoading: boolean;

  error: unknown;
};

export function useAppQuery<Data>(
  fetchData: () => Promise<Data>
): useAppQueryReturn<Data> {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const _fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    void _fetchData();
  }, [_fetchData]);

  return {
    data,
    isLoading,

    error
  };
}
