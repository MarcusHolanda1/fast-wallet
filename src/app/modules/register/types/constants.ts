export interface CardValidatorMessages {
  cardNumber: {
    required: string;
    matches: string;
  };
  cardHolder: {
    required: string;
    min: string;
  };
  expiryDate: {
    required: string;
    matches: string;
    notExpired: string;
  };
  cvv: {
    required: string;
    matches: string;
  };
}
