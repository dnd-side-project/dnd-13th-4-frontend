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

/**
 * 외부 푸시 알림을 보내는 함수(테스트용)
 */
export async function sendPushNotification(
  expoPushToken: string,
): Promise<void> {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  // 이것이 호출되면, expo서버에서 token에 해당하는 디바이스로 푸시를 발송.
  // 디바이스에서는 인터넷만 켜져있으면 푸시를 수신함.
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string): void {
  alert(errorMessage);
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
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}
