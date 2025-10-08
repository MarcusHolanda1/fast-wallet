export const replaceWithTextOnly = (text: string) => {
  return text.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
};

export const formatCardNumber = (cardNumber: string) => {
  return cardNumber.slice(-4);
};
