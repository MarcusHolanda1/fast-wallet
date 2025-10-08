import { useState, useEffect } from 'react';
import { Keyboard, EmitterSubscription } from 'react-native';

const useKeyboardVisibility = (): boolean => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyboardDidShow = (): void => {
      setIsKeyboardVisible(true);
    };

    const handleKeyboardDidHide = (): void => {
      setIsKeyboardVisible(false);
    };

    const keyboardDidShowListener: EmitterSubscription = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow
    );

    const keyboardDidHideListener: EmitterSubscription = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide
    );

    return (): void => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

export default useKeyboardVisibility;
