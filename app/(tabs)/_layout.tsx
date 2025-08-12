import { DebugFloatingTokenButton } from '@/components/debug/DebugFloatingTokenButton';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { registerForPushNotificationsAsync } from '@/lib/notifications';
import * as Notifications from 'expo-notifications';
import { Tabs, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

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
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            height: 84,
            ...Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: 'absolute',
              },
              default: {},
            }),
          },
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name='textformat' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='Storage'
          options={{
            title: 'Storage',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name='paintpalette' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='MindLetter'
          options={{
            title: '',
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#4A90E2',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
              </View>
            ),
            tabBarButton: (props) => (
              <Pressable
                onPress={() => {
                  router.push('/CreateMindLetter');
                }}
                style={[props.style, { top: -10 }]}
              >
                {props.children}
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name='Statistics'
          options={{
            title: 'Statistics',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name='textformat' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='MyPage'
          options={{
            title: 'MyPage',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name='paintpalette' color={color} />
            ),
          }}
        />
      </Tabs>
      <DebugFloatingTokenButton token={expoPushToken} />
    </View>
  );
}
