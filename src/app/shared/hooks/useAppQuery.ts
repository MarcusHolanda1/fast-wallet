import { useCallback, useEffect, useState } from 'react';

type useAppQueryReturn<DataT> = {
  data?: DataT;
  isLoading: boolean;
  error: unknown;
};

export function useAppQuery<DataT>(
  fetchData: () => Promise<DataT>
): useAppQueryReturn<DataT> {
  const [data, setData] = useState<DataT>();
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
