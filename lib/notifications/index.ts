import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * 로컬 푸시 알림을 예약하는 함수(테스트용)
 */
export async function schedulePushNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2, // 2초후에 알림발송
    },
  });
}

export type PushMessageProps = {
  to: string; // expoPushToken
  sound?: 'default' | null;
  title?: string;
  body?: string;
  data?: Record<string, any>;
};

function handleRegistrationError(errorMessage: string): void {
  console.error(errorMessage);
  throw new Error(errorMessage);
}

/**
 * 알림권한 요청 및 알림권한 여부 체크 및 토큰반환 함수
 */
export async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError(
        'Permission not granted to get push token for push notification!',
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      // 직접 expo server를 찌를때 사용하는 토큰
      //   const pushTokenString = (
      //     await Notifications.getExpoPushTokenAsync({
      //       projectId,
      //     })
      //   ).data;

      // FCM or APNs 를 찌를때 사용하는 토큰
      const pushTokenString = (await Notifications.getDevicePushTokenAsync())
        .data;

      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}
