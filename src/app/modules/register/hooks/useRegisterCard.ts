import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { CardFormData, cardValidatorSchema } from '../constants/cardValidator';
import { createCard } from '../services/card';
import { CardPayload } from '../types/card';

const useRegisterCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<CardFormData>({
    resolver: yupResolver(cardValidatorSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: CardFormData) => {
    setIsLoading(true);

    const payload: CardPayload = {
      number: data.cardNumber,
      cvv: data.cvv,
      name: data.cardHolder,
      expires: data.expiryDate
    };

    try {
      const response = await createCard(payload);

      return response;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    isValid,
    onSubmit
  };
};

export default useRegisterCard;
