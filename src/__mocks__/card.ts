import { Card } from '@app/shared/types/card';

export const generateFakeCardData = (card?: Card): Card => {
  return {
    id: card?.id ?? '1',
    number: card?.number ?? '4111111111111111',
    cvv: card?.cvv ?? '333',
    name: card?.name ?? 'MARCUS HOLANDA',
    expires: card?.expires ?? '12/30'
  };
};
