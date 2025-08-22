import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

type ResponsiveImageProps = {
  source: ImageSourcePropType; // require(...) 또는 { uri }
  width: number; // 부모 기준 width(px)
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center' | 'repeat';
  style?: StyleProp<ImageStyle>;
  onError?: (e: unknown) => void;
};

/** 반응형 이미지: width만 주면 원본 비율로 height 자동 계산 */
const ResponsiveImage = ({
  source,
  width,
  resizeMode = 'contain',
  style,
  onError,
}: ResponsiveImageProps) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!width) return;

    if (typeof source === 'number') {
      const res = Image.resolveAssetSource(source);
      if (res?.width && res?.height) {
        setHeight((width * res.height) / res.width);
      }
      return;
    }

    const uri =
      typeof source === 'object' && source && !Array.isArray(source)
        ? (source as { uri?: string }).uri
        : undefined;

    if (!uri) return;

    Image.getSize(
      uri,
      (imgW, imgH) => setHeight((width * imgH) / imgW),
      (err) => {
        onError?.(err);
        setHeight(width); // 폴백
      },
    );
  }, [source, width]);

  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={[{ width, height }, style]}
    />
  );
};

export default ResponsiveImage;
