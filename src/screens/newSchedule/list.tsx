import React from 'react';
import { Box, FlatList } from 'native-base';
import Text from '@components/text';
import Pressable from '@components/pressable';
import { colors } from '@styles/theme';

interface Props {
  data: any[];
  keyExtractor: (item: string, index: number) => string;
  isActive?: (item: string) => boolean;
  title?: string;
  onPress?: (item: any) => void;
  name?: (item: any) => string;
}


const List = (p: Props) => {
  return (
    <>
      {p.data.length > 0 && (
        <>
          <Text h3 bold mt={5} px={5} mb={2}>{p.title}</Text>
          <FlatList
            data={p.data}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={() => <Box w={2} />}
            keyExtractor={p.keyExtractor}
            renderItem={({ item }) => (
              <Pressable px={3} py={2} rounded="10px" bg={p.isActive ? colors.primary : colors.secondary} onPress={() => p.onPress && p.onPress(item)}>
                <Text semibold color={p.isActive ? colors.white : colors.grey400}>
                  {p.name ? p.name(item) : item}
                </Text>
              </Pressable>
            )}
          />
        </>
        )}
    </>
  )
}

export default List;