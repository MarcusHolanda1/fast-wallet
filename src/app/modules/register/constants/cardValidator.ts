import * as yup from 'yup';

export const cardValidatorSchema = yup.object({
  cardNumber: yup
    .string()
    .required('Número do cartão é obrigatório')
    .matches(/^\d{16}$/, 'Número do cartão deve ter 16 dígitos'),

  cardHolder: yup
    .string()
    .required('Nome do titular é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),

  expiryDate: yup
    .string()
    .required('Data de vencimento é obrigatória')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido (MM/YY)')
    .test('not-expired', 'Cartão expirado', function (value) {
      if (!value) return false;
      const [month, year] = value.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const now = new Date();
      return expiry > now;
    }),

  cvv: yup
    .string()
    .required('CVV é obrigatório')
    .matches(/^\d{3,4}$/, 'CVV deve ter 3 ou 4 dígitos')
});

export type CardFormData = yup.InferType<typeof cardValidatorSchema>;
