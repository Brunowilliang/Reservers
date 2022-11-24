import React from 'react';
import Text from '@components/text';
import Pressable from '@components/pressable';
import { colors } from '@styles/theme';
import { HStack, IPressableProps, VStack } from 'native-base';
import { CaretRight } from 'phosphor-react-native';
import { ServicesRecord } from '@utils/types';

type Props = IPressableProps & {
  onPress: () => void;
  disabled?: boolean;
  item: ServicesRecord;
  variant?: 'primary' | 'secondary';
}

const Card = ( p: Props ) => {
  return (
    <Pressable bg={colors.secondary} disabled={p.disabled} rounded={"14px"} alignItems="flex-start" py={3} px={5} {...p}>
      <HStack space={4} alignItems="center">
        <VStack space={0} flex={1}>
          <Text h5 flex={1} numberOfLines={1} bold color={colors.grey400}>{p.item.name}</Text>
          <HStack space={1}>
            <Text h6 numberOfLines={1} medium color={colors.grey400}>Duração</Text>
            <Text h6 numberOfLines={1} medium color={colors.grey400}>{p.item.duration + ' min.'}</Text>
          </HStack>
          <HStack space={2}>
            <Text h5 numberOfLines={1} medium color={colors.grey400}>R$</Text>
            <Text h5 numberOfLines={1} medium color={colors.grey400}>{p.item.price},00
            </Text>
          </HStack>
        </VStack>
        <CaretRight size={25} weight="bold" color={colors.grey400} />
      </HStack>
    </Pressable>
  )
}

export default Card;