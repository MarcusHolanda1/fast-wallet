import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppNavigation } from '@app/shared/hooks/useNavigation';
import { Toast } from 'toastify-react-native';

import { CardFormData, cardValidatorSchema } from '../constants/cardValidator';
import { createCard } from '../services/card';
import { CardPayload } from '../types/card';

const useRegisterCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useAppNavigation();

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
      await createCard(payload);

      navigation.navigate('RegisterSuccessScreen');
    } catch (error) {
      Toast.error('Erro ao cadastrar cartão. Tente novamente.');
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
