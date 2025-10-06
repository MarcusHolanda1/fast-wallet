import { Card } from '@app/shared/types/card';

export const generateFakeCardData = (): Card => {
  return {
    id: '1',
    number: '4111111111111111',
    cvv: '333',
    name: 'MARCUS HOLANDA',
    expires: '12/30'
  };
};

export const mockCreateCardResponse = (
  cardData: Card
): Promise<{ status: number; data: Card }> =>
  Promise.resolve({
    status: 200,
    data: cardData
  });
