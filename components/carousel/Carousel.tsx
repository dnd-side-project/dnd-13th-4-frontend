import { PrimaryColors } from '@/constants/Colors';
import { ReactNode, useRef } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import CarouselUi, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';

type CarouselProps = {
  itemList: ReactNode[];
  width: number;
  itemWidth: number;
  itemGap?: number;
  height: number;
  onChange?: (index: number) => void;
};

const Carousel = ({
  itemList,
  height,
  width,
  itemWidth,
  itemGap = 20,
  onChange,
}: CarouselProps) => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number): void => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      index,
      animated: true,
    });
  };

  return (
    <View>
      <CarouselUi
        data={itemList}
        height={height}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={width}
        onSnapToItem={(index) => onChange?.(index)}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: width - itemWidth - itemGap,
          parallaxAdjacentItemScale: 1,
        }}
        onProgressChange={progress}
        renderItem={({ index, item }) => <View>{item}</View>}
      />

      <Pagination.Custom
        progress={progress}
        // data는 array의 length만 사용하기에, itemList개수로 dummy array를 만듦.
        // data에 ReactNode타입 삽입이 되지않음.
        data={Array.from<number>({ length: itemList.length })}
        dotStyle={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: 50,
          paddingVertical: 4,
          width: 8,
          height: 8,
        }}
        activeDotStyle={{
          backgroundColor: PrimaryColors.blue100,
          borderRadius: 50,
          width: 15,
          height: 15,
        }}
        containerStyle={{ gap: 8, alignItems: 'center' }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default Carousel;
