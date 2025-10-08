import { useState } from 'react';

type UseAppMutationReturn<DataT, TVariables> = {
  mutate: (variable: TVariables) => Promise<DataT>;
  isLoading: boolean;
  error: unknown;
};

type UseAppMutationParams<TData, TVariables> = {
  mutateFn: (variable: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};

export function useAppMutation<TData, TVariables>({
  mutateFn,
  onSuccess,
  onError
}: UseAppMutationParams<TData, TVariables>): UseAppMutationReturn<
  TData,
  TVariables
> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function mutate(variables: TVariables) {
    setIsLoading(true);
    setError(null);
    try {
      const data = await mutateFn(variables);
      onSuccess?.(data);
      return data;
    } catch (err) {
      onError?.(err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    mutate,
    isLoading,
    error
  };
}
