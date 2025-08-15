import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BackgroundType =
  | { type: 'solid'; color: string }
  | { type: 'gradient'; colors: readonly [string, string, ...string[]]; locations?: readonly [number, number, ...number[]] }
  | null;

interface SafeScreenLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  background?: BackgroundType;
  header?: React.ReactNode;
}

export const SafeScreenLayout: React.FC<SafeScreenLayoutProps> = ({
  children,
  style,
  background,
  header,
}) => {
  const renderBackground = () => {
    if (!background) {
      return (
        <SafeAreaView
          style={[styles.container, style]}
          edges={header ? ['left', 'right', 'top'] : ['left', 'right']}
        >
          {header}
          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      );
    }

    if (background.type === 'solid') {
      return (
        <SafeAreaView
          style={[
            styles.container,
            { backgroundColor: background.color },
            style,
          ]}
          edges={header ? ['left', 'right', 'top'] : ['left', 'right']}
        >
          {header}
          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      );
    }

    if (background.type === 'gradient') {
      return (
        <LinearGradient
          colors={background.colors}
          locations={background.locations}
          style={[styles.container, style]}
        >
          <SafeAreaView
            style={styles.transparentContainer}
            edges={header ? ['left', 'right', 'top'] : ['left', 'right']}
          >
            {header}
            <View style={styles.content}>{children}</View>
          </SafeAreaView>
        </LinearGradient>
      );
    }
  };

  return renderBackground();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transparentContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
