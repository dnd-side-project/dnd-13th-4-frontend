import { HapticTab } from '@/components/HapticTab';
import { Icon } from '@/components/icons';
import { IconName } from '@/components/icons/iconComponents';
import { HomeTutorial } from '@/components/tutorial/HomeTutorial';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { LOGO } from '@/constants';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// 알림수신 시 포그라운드에서의 동작 정의
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// 공통 탭 아이콘 생성 함수
const createTabIcon = (iconName: IconName) => {
  const TabIcon = ({ focused }: { focused: boolean }) => (
    <Icon
      name={iconName}
      size={20}
      color={focused ? GreyColors.grey800 : GreyColors.grey400}
      style={styles.tabIcon}
    />
  );

  TabIcon.displayName = `TabIcon(${iconName})`;
  return TabIcon;
};

// 중간 플러스 버튼 컴포넌트
const CreateButton = (props: BottomTabBarButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onPress = () => {
    if (pathname === '/notes/feeling') return; // 같은 페이지면 재진입 막기 (애니메이션 X)
    router.push('/notes/feeling');
  };

  return (
    <Pressable onPress={onPress} style={[props.style]}>
      <View style={styles.createButton}>
        <Icon name='star' size={30} color='white' />
      </View>
    </Pressable>
  );
};

export default function TabLayout() {
  const pathname = usePathname();
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            tabBarBackground: TabBarBackground,
            tabBarActiveTintColor: GreyColors.grey800,
            tabBarInactiveTintColor: GreyColors.grey400,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarStyle: baseTabBarStyle,

            // TODO : 명시적으로 설정한 Tab외의 버튼들은 아예 안보이게 하기위한 궁여지책 ..
            tabBarButton: () => null,
            tabBarItemStyle: { display: 'none' },
          }}
        >
          {/* 홈 탭 */}
          <Tabs.Screen
            name='index'
            options={{
              title: '홈',
              headerTitle: () => (
                <Image source={{ uri: LOGO }} style={styles.logo} />
              ),
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              tabBarItemStyle: { display: 'flex' },
              tabBarButton: HapticTab,
              tabBarIcon: createTabIcon('home'),
            }}
          />

          {/* 보관함 탭 */}
          <Tabs.Screen
            name='archive'
            options={{
              title: '보관함',
              headerTitle: '보관함',
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              tabBarItemStyle: { display: 'flex' },
              tabBarButton: HapticTab,
              tabBarIcon: createTabIcon('dashboard'),
              tabBarStyle: shadowTabBarStyle,
            }}
          />

          {/* 편지 쓰기 버튼 (실제 탭이 아님) */}
          <Tabs.Screen
            name='MindLetter'
            options={{
              title: '',
              headerShown: false,
              tabBarItemStyle: { display: 'flex' },
              tabBarButton: CreateButton,
            }}
          />

          {/* 리포트 탭 */}
          <Tabs.Screen
            name='Statistics'
            options={{
              title: '리포트',
              headerTitle: '리포트',
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              tabBarItemStyle: { display: 'flex' },
              tabBarButton: HapticTab,
              tabBarIcon: createTabIcon('graph'),
              tabBarStyle: shadowTabBarStyle,
            }}
          />

          {/* 마이페이지 탭 */}
          <Tabs.Screen
            name='MyPage'
            options={{
              title: '마이페이지',
              headerTitle: '마이페이지',
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              tabBarItemStyle: { display: 'flex' },
              tabBarButton: HapticTab,
              tabBarIcon: createTabIcon('user'),
              tabBarStyle: shadowTabBarStyle,
            }}
          />
        </Tabs>
        
        {/* 홈 화면일 때만 튜토리얼 표시 */}
        {pathname === '/' && <HomeTutorial />}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 57,
    height: 24,
    resizeMode: 'contain',
  },
  headerStyle: {
    paddingVertical: 16,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    ...Typography.head2,
    color: GreyColors.grey900,
  },
  tabBarLabel: {
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
  tabIcon: {
    marginTop: 6,
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PrimaryColors.blue100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// 👉 기본: 그림자 없는 스타일
const baseTabBarStyle = {
  height: 88,
  borderTopWidth: 0,
  shadowOpacity: 0,
  elevation: 0,
};

// 👉 그림자 있는 스타일 (base + shadow)
const shadowTabBarStyle = {
  ...baseTabBarStyle,
  borderTopWidth: 1,
  borderTopColor: PrimaryColors.blue300,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: -3 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 10,
};
