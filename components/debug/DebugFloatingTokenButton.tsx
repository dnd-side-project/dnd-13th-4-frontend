import { schedulePushNotification } from '@/lib/notifications';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

export const DebugFloatingTokenButton = ({ token }: { token: string }) => {
  const handleShowAlert = () => {
    Alert.alert(
      'Expo Push Token',
      token || '토큰 없음',
      [
        {
          text: '닫기',
          style: 'cancel',
        },
        {
          text: '복사하기',
          onPress: async () => {
            await Clipboard.setStringAsync(token);
            Alert.alert('복사 완료', '토큰이 클립보드에 복사되었습니다.');
          },
        },
        {
          text: '로컬푸시',
          onPress: async () => await schedulePushNotification(),
        },
      ],
      { cancelable: true },
    );
  };

  if (process.env.EXPO_PUBLIC_ENV === 'production') return null;

  return (
    <TouchableOpacity style={styles.floatingButton} onPress={handleShowAlert}>
      <Text style={styles.floatingButtonText}>🐛</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: '#333',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 20,
  },
});
