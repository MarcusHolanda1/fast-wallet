export const replaceWithTextOnly = (text: string) => {
  return text.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
};
