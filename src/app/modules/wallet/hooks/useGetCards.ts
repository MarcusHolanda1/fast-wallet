import { useAppDispatch } from '@app/store/hooks';
import { useCallback, useEffect } from 'react';
import { setCards } from '@app/shared/store/cardSlice';
import { Toast } from 'toastify-react-native';
import { useAppNavigation } from '@app/shared/hooks/useAppNavigation';
import { useAppQuery } from '@app/shared/hooks/useAppQuery';
import { HttpResponse } from '@app/shared/services/httpClient/types';
import { Card } from '@app/shared/types/card';

import { getCards } from '../services/card';

const useGetCards = () => {
  const {
    isLoading,
    data: cards,
    error
  } = useAppQuery<HttpResponse<Card[]>>(getCards);

  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();

  const fetchCards = useCallback(() => {
    if (error) {
      Toast.error('Ocorreu um erro ao carregar os cartões.');
      navigate.goBack();
      return;
    }
    if (cards?.data) {
      dispatch(setCards(cards.data));
    }
  }, [cards?.data, dispatch, error, navigate]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    isLoading
  };
};
export default useGetCards;
