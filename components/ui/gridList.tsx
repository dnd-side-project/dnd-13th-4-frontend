// components/common/GridList.tsx
import React from 'react';
import { FlatList, FlatListProps, StyleProp, ViewStyle } from 'react-native';

type GridListProps<T> = {
  data: T[];
  numColumns?: number;
  gap?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  renderItem: FlatListProps<T>['renderItem'];
  keyExtractor: (item: T, index: number) => string;
};

export default function GridList<T>({
  data,
  numColumns = 2,
  gap = 16,
  contentContainerStyle,
  renderItem,
  keyExtractor,
}: GridListProps<T>) {
  return (
    <FlatList
      data={data}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ gap }, contentContainerStyle]}
      columnWrapperStyle={{ gap }}
    />
  );
}
