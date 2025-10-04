import { httpClient } from '@app/shared/services/httpClient/httpClient';

import { CARDS } from '../constants/endpoints';
import { CardsResponse } from './types';

export const getCards = async () => {
  const response: CardsResponse = await httpClient.get(CARDS);
  return response;
};
