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
  height: number;
};

const Carousel = ({ itemList, height, width }: CarouselProps) => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <CarouselUi
        autoPlayInterval={2000}
        data={itemList}
        height={height}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={width}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.8,
          parallaxScrollingOffset: 200,
          parallaxAdjacentItemScale: 0.8,
        }}
        onProgressChange={progress}
        renderItem={({ index, item }) => <View>{item}</View>}
      />

      <Pagination.Basic
        progress={progress}
        // data는 array의 length만 사용하기에, itemList개수로 dummy array를 만듦.
        // data에 ReactNode타입 삽입이 되지않음.
        data={Array.from<number>({ length: itemList.length })}
        dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default Carousel;
