import * as yup from 'yup';

import { CardValidatorMessages } from '../types/constants';

export const cardValidatorMessages: CardValidatorMessages = {
  cardNumber: {
    required: 'Número do cartão é obrigatório',
    matches: 'Número do cartão deve ter 16 dígitos'
  },
  cardHolder: {
    required: 'Nome do titular é obrigatório',
    min: 'Nome deve ter pelo menos 2 caracteres'
  },
  expiryDate: {
    required: 'Data de vencimento é obrigatória',
    matches: 'Formato inválido (MM/YY)',
    notExpired: 'Cartão expirado'
  },
  cvv: {
    required: 'CVV é obrigatório',
    matches: 'CVV deve ter 3 ou 4 dígitos'
  }
};

export const cardValidatorSchema = yup.object({
  cardNumber: yup
    .string()
    .required(cardValidatorMessages.cardNumber.required)
    .matches(/^\d{16}$/, cardValidatorMessages.cardNumber.matches),

  cardHolder: yup
    .string()
    .required(cardValidatorMessages.cardHolder.required)
    .min(2, cardValidatorMessages.cardHolder.min),

  expiryDate: yup
    .string()
    .required(cardValidatorMessages.expiryDate.required)
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      cardValidatorMessages.expiryDate.matches
    )
    .test(
      'not-expired',
      cardValidatorMessages.expiryDate.notExpired,
      function (value) {
        if (!value) return false;
        const [month, year] = value.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const now = new Date();
        return expiry > now;
      }
    ),

  cvv: yup
    .string()
    .required(cardValidatorMessages.cvv.required)
    .matches(/^\d{3,4}$/, cardValidatorMessages.cvv.matches)
});

export type CardFormData = yup.InferType<typeof cardValidatorSchema>;
