export interface Card {
  id: string;
  number: string;
  cvv: string;
  name: string;
}

export interface CardPayload {
  number: string;
  cvv: string;
  name: string;
}
