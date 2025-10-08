import { useAppDispatch } from '@app/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { setCards } from '@app/shared/store/cardSlice';
import { Toast } from 'toastify-react-native';
import { useAppNavigation } from '@app/shared/hooks/useAppNavigation';

import { getCards } from '../services/card';

const useGetCards = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCards();
      dispatch(setCards(response.data));

      return response.data;
    } catch (error) {
      Toast.error('Ocorreu um erro ao carregar os cartões.');

      navigate.goBack();
      return error;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    void fetchCards();
  }, [fetchCards]);

  return {
    isLoading
  };
};
export default useGetCards;
