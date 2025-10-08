import { useState, useEffect } from 'react';
import { Keyboard, EmitterSubscription } from 'react-native';

const useKeyboardVisibility = (): boolean => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyboardDidShow = (): void => {
      setKeyboardVisible(true);
    };

    const handleKeyboardDidHide = (): void => {
      setKeyboardVisible(false);
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
