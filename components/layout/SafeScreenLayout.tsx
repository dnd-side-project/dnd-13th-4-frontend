import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeScreenLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SafeScreenLayout: React.FC<SafeScreenLayoutProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['left', 'right']}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
