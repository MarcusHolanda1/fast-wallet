import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { httpClient } from '@app/shared/services/httpClient/httpClient';
import { useState } from 'react';

import { CardFormData, cardValidatorSchema } from '../constants/cardValidator';
import { CARDS } from '../constants/endpoints';

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

    const payload = {
      number: data.cardNumber,
      cvv: data.cvv,
      name: data.cardHolder
    };

    try {
      const response = await httpClient.post(CARDS, payload);

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
