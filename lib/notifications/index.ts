import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/** iOS 권한 체크: RNFirebase Messaging 사용 */
async function requestUserPermissionIOS(): Promise<boolean> {
  // iOS 알림 권한 요청 (배너/사운드/배지)
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // APNs 등록 (필수)
    await messaging().registerDeviceForRemoteMessages();
    console.log('iOS notification authorization status:', authStatus);
  }
  return enabled;
}

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

  if (!Device.isDevice) {
    handleRegistrationError('Must use physical device for push notifications');
    return;
  }

  // === iOS 권한은 RNFirebase로 ===
  if (Platform.OS === 'ios') {
    const ok = await requestUserPermissionIOS();
    if (!ok) {
      handleRegistrationError('iOS: Notification permission not granted');
      return;
    }

    // ✅ iOS에서 FCM을 쓸 거라면 FCM 토큰으로 통일
    const fcmToken = await messaging().getToken();
    if (!fcmToken) handleRegistrationError('iOS: Failed to get FCM token');
    return fcmToken;

    // ❗ 만약 APNs 토큰(디바이스 토큰)이 필요하면 아래로 대체:
    // const apnsToken = (await Notifications.getDevicePushTokenAsync()).data;
    // return apnsToken;
  }

  // === Android 권한 (Expo Notifications) ===
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    handleRegistrationError('Android: Permission not granted');
    return;
  }

  // ✅ Android도 FCM 토큰으로 통일
  const fcmToken = await messaging().getToken();
  if (!fcmToken) handleRegistrationError('Android: Failed to get FCM token');
  return fcmToken;

  // 📌 참고: Expo 전용 토큰이 필요할 때
  // const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  // if (!projectId) handleRegistrationError('Project ID not found');
  // const expoToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  // return expoToken;
}
