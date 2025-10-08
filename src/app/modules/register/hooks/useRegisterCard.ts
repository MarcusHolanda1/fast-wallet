import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAppNavigation } from '@app/shared/hooks/useAppNavigation';
import { Toast } from 'toastify-react-native';
import { useAppDispatch } from '@app/store/hooks';
import { setCard } from '@app/shared/store/cardSlice';
import { useAppMutation } from '@app/shared/hooks/useAppMutation';

import { CardFormData, cardValidatorSchema } from '../constants/cardValidator';
import { createCard } from '../services/card';
import { CardPayload } from '../../../shared/types/card';

const useRegisterCard = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const { mutate, isLoading } = useAppMutation({
    mutateFn: createCard,
    onSuccess: (newCard) => {
      dispatch(setCard(newCard.data));

      navigation.navigate('RegisterSuccessScreen', { card: newCard.data });
    },
    onError: () => {
      Toast.error('Erro ao cadastrar cartão. Tente novamente');
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<CardFormData>({
    resolver: yupResolver(cardValidatorSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: CardFormData) => {
    const payload: CardPayload = {
      number: data.cardNumber,
      cvv: data.cvv,
      name: data.cardHolder,
      expires: data.expiryDate
    };
    try {
      await mutate(payload);
      // eslint-disable-next-line no-empty
    } catch {}
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
