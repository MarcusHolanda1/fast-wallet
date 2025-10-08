import { Card } from '@app/shared/types/card';

export const mockCreateCardResponse = (
  cardData: Card
): Promise<{ status: number; data: Card }> =>
  Promise.resolve({
    status: 200,
    data: cardData
  });
