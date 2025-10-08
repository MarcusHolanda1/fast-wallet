import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppNavigation } from '@app/shared/hooks/useAppNavigation';
import { Toast } from 'toastify-react-native';
import { useAppDispatch } from '@app/store/hooks';
import { setCard } from '@app/shared/store/cardSlice';

import { CardFormData, cardValidatorSchema } from '../constants/cardValidator';
import { createCard } from '../services/card';
import { CardPayload } from '../../../shared/types/card';

const useRegisterCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

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

      dispatch(setCard(response.data));

      control._reset();

      navigation.navigate('RegisterSuccessScreen', { card: response.data });
    } catch (error) {
      Toast.error('Erro ao cadastrar cartão. Tente novamente');
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
