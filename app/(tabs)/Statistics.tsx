import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import BottleSection from '@/components/statistics/BottleSection';
import GrowthSection from '@/components/statistics/GrowthSection';
import Header from '@/components/statistics/Header';
import KeywordSection from '@/components/statistics/KeywordSection';
import { S3_IMAGE_URL } from '@/constants';
import { GreyColors } from '@/constants/Colors';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export default function Statistics() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

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
        <CustomText
          variant='head1'
          color={GreyColors.grey800}
          fontWeight='bold'
          style={styles.headerMessage}
        >
          지금까지 총 84개의{'\n'}마음을 주고 받았어요
        </CustomText>
        <BottleSection refreshKey={refreshKey} onRefresh={handleRefresh} />

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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    zIndex: -1,
  },
  scrollContainer: {
    paddingTop: 44,
    flex: 1,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  headerMessage: {
    textAlign: 'center',
    marginBottom: 25,
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
