import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import BottleSection from '@/components/statistics/BottleSection';
import GrowthSection from '@/components/statistics/GrowthSection';
import Header from '@/components/statistics/Header';
import KeywordSection from '@/components/statistics/KeywordSection';
import { S3_IMAGE_URL } from '@/constants';
import { LAYOUT_HEADER_HEIGHT } from '@/constants/layout';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export default function Statistics() {

  return (
    <SafeScreenLayout>
      {/* 배경 이미지 */}
      <Image
        source={{
          uri: `${S3_IMAGE_URL}/statistics/statistics_main_background.png`,
        }}
        style={styles.backgroundImage}
      />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Header />
        <BottleSection />
        <View style={styles.contentArea}>
          <GrowthSection />
          <KeywordSection />
        </View>
      </ScrollView>
    </SafeScreenLayout>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  scrollContainer: {
    paddingTop: LAYOUT_HEADER_HEIGHT,
    flex: 1,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  contentArea: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});
