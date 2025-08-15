import { DebugFloatingTokenButton } from '@/components/debug/DebugFloatingTokenButton';
import { HapticTab } from '@/components/HapticTab';
import { Icon } from '@/components/icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import { registerForPushNotificationsAsync } from '@/lib/notifications';
import * as Notifications from 'expo-notifications';
import { Tabs, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';

const LOGO = 'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/logo.png';

// 알림수신 시 포그라운드에서의 동작 정의
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function TabLayout() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  useEffect(() => {
    // 토큰을 받아 상태로 저장. 이 토큰으로 특정사용자에게 푸시가 가능해짐.
    // 보통은 백엔드에게 token을 전달. 백엔드는 이 token으로 푸시를 보냄.
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    // 알림 수신 리스너 등록
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    // 사용자가 백그라운드에서 알림을 탭해서 앱을 열었을때를 감지하는 리스너
    // 여기서 특정화면으로 넘기는 등의 동작 삽입 필요
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Tabs
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarActiveTintColor: GreyColors.grey800,
          tabBarInactiveTintColor: GreyColors.grey400,
          tabBarLabelStyle: {
            ...Typography.body4,
            marginTop: 6,
          },
          tabBarStyle: {
            height: 88,
            borderTopWidth: 1,
            shadowColor: '#000000',
            borderTopColor: PrimaryColors.blue300,
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 10,
          },
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: '홈',
            headerTitle: () => (
              <Image
                source={{ uri: LOGO }}
                style={{
                  width: 57,
                  height: 24,
                  resizeMode: 'contain',
                }}
              />
            ),
            headerStyle: {
              backgroundColor: 'white',
              paddingVertical: 16,
              elevation: 0, // Android shadow 제거
              shadowOpacity: 0, // iOS shadow 제거
            },
            headerTitleStyle: {
              ...Typography.head2,
              color: GreyColors.grey900,
            },
            tabBarIcon: ({ focused }) => (
              <Icon
                name='home'
                size={20}
                color={focused ? GreyColors.grey800 : GreyColors.grey400}
                style={{ marginTop: 6 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='Storage'
          options={{
            title: '보관함',
            headerTitle: '보관함',
            headerStyle: {
              backgroundColor: 'white',
              paddingVertical: 16,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              ...Typography.head2,
              color: GreyColors.grey900,
            },
            tabBarIcon: ({ focused }) => (
              <Icon
                name='dashboard'
                size={20}
                color={focused ? GreyColors.grey800 : GreyColors.grey400}
                style={{ marginTop: 6 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='MindLetter'
          options={{
            title: '',
            headerShown: false, // 이 페이지만 헤더 숨김
            tabBarButton: (props) => (
              <Pressable
                onPress={() => {
                  router.push('/CreateMindLetter');
                }}
                style={[props.style]}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 44,
                    backgroundColor: PrimaryColors.blue100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name='star' size={30} color='white' />
                </View>
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name='Statistics'
          options={{
            title: '통계',
            headerTitle: '통계',
            headerStyle: {
              backgroundColor: 'white',
              paddingVertical: 16,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              ...Typography.head2,
              color: GreyColors.grey900,
            },
            tabBarIcon: ({ focused }) => (
              <Icon
                name='graph'
                size={20}
                color={focused ? GreyColors.grey800 : GreyColors.grey400}
                style={{ marginTop: 6 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='MyPage'
          options={{
            title: '마이페이지',
            headerTitle: '마이페이지',
            headerStyle: {
              backgroundColor: 'white',
              paddingVertical: 16,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              ...Typography.head2,
              color: GreyColors.grey900,
            },
            tabBarIcon: ({ focused }) => (
              <Icon
                name='user'
                size={20}
                color={focused ? GreyColors.grey800 : GreyColors.grey400}
                style={{ marginTop: 6 }}
              />
            ),
          }}
        />
      </Tabs>
      <DebugFloatingTokenButton token={expoPushToken} />
    </View>
  );
}
