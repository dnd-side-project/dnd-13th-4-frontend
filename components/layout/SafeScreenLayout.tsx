import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BackgroundType =
  | { type: 'solid'; color: string }
  | {
      type: 'gradient';
      colors: readonly [string, string, ...string[]];
      locations?: readonly [number, number, ...number[]];
      start?: LinearGradientPoint;
      end?: LinearGradientPoint;
    }
  | { type: 'image'; uri: string }
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
          start={background.start}
          end={background.end}
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

    if (background.type === 'image') {
      return (
        <ImageBackground
          source={{ uri: background.uri }}
          style={[styles.container, style]}
        >
          <SafeAreaView
            style={styles.container}
            edges={header ? ['left', 'right', 'top'] : ['left', 'right']}
          >
            {header}
            <View style={styles.content}>{children}</View>
          </SafeAreaView>
        </ImageBackground>
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
