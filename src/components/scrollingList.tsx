import { colors } from '@styles/theme';
import { Box, FlatList, HStack, IBoxProps, IScrollViewProps } from 'native-base';
import * as Progress from 'react-native-progress';
import React from 'react';
import { RefreshControl } from 'react-native';
import Text from './text';

type Props = IScrollViewProps & {
  data: any;
  renderItem: any;
  keyExtractor: any;
  separator?: number;
  loading?: boolean;
  headerText?: string;
  refreshing: boolean;
  emptyText?: string;
  onRefresh?: () => void;
}

const ScrollingList = (p:Props) => {
  return (
    <>
      {p.loading ? (
        <Box width="100%" pt={5} justifyContent="center" alignItems="center">
          <Progress.Circle borderWidth={4} color={colors.grey400} size={35} endAngle={0.7} indeterminate={true} />
        </Box>
      ) : (
        <FlatList
          {...p}
          data={p.data}
          keyExtractor={p.keyExtractor}
          ItemSeparatorComponent={() => <Box h={p.separator} />}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={p.headerText ? [0] : undefined}
          ListHeaderComponent={
            p.headerText && (
              p.data.length > 0 && (
                <HStack justifyContent="space-between" alignItems="flex-end" bg={colors.background}>
                  <Text h3 mb={3} semibold color={colors.grey400}>{p.headerText}</Text>
                </HStack>
            ))as any}
          refreshControl={
            <RefreshControl
              tintColor={colors.white}
              refreshing={p.refreshing}
              onRefresh={p.onRefresh}
            />
          }
          ListEmptyComponent={
              <Text h5 textAlign="center" pt={5} semibold color={colors.grey600}>{p.emptyText}</Text>
          }
          renderItem={p.renderItem}
        />
      )}
    </>
  );
}

export default ScrollingList;