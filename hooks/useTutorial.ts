import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useTutorial = (tutorialKey: string) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    checkTutorialStatus();
  }, [tutorialKey]);

  const checkTutorialStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem(tutorialKey);
      if (!completed) {
        setVisible(true);
      }
    } catch (error) {
      console.error('Error checking tutorial status:', error);
    }
  };

  const close = async () => {
    try {
      await AsyncStorage.setItem(tutorialKey, 'true');
      setVisible(false);
    } catch (error) {
      console.error('Error saving tutorial status:', error);
    }
  };

  return {
    visible,
    close,
  };
};