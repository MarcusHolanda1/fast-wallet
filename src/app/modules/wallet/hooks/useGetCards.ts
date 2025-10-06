import { useAppDispatch } from '@app/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { setCards } from '@app/shared/store/cardSlice';

import { getCards } from '../services/card';

const useGetCards = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCards();
      dispatch(setCards(response.data));

      return response.data;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    void fetchCards();
  }, [fetchCards]);

  return {
    isLoading
  };
};
export default useGetCards;
