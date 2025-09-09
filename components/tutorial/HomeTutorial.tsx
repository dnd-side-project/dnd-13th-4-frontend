import { S3_IMAGE_URL } from '@/constants';
import { useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

const TUTORIAL_IMAGE_URL = `${S3_IMAGE_URL}/home/home_tutorial.png`;

export const HomeTutorial = () => {
  const [visible, setVisible] = useState(true);

  const close = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Pressable style={styles.tutorialOverlay} onPress={close}>
      <Image
        source={{ uri: TUTORIAL_IMAGE_URL }}
        style={styles.tutorialImage}
        resizeMode='contain'
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tutorialOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#474A4D',
    zIndex: 1000,
  },
  tutorialImage: {
    width: '100%',
    height: '100%',
  },
});
