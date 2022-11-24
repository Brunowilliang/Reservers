import React from 'react'
import { HStack, VStack } from 'native-base'
import Text from './text'
import Pressable from './pressable';
import { colors } from '@styles/theme';
import { CaretRight } from 'phosphor-react-native';

type Props = {
  title: string;
  titleColor?: string;
  subTitle?: string;
  subTitleColor?: string;
  iconName?: string;
  Toggle?: boolean;
  onPress?: () => void;
  isOn?: boolean;
  onToggle?: () => void;
  action?: boolean;
}

const List = (p: Props) => {
  return (
    <Pressable alignItems="flex-start" onPress={p.onPress}>
      <HStack py={4} borderBottomColor={colors.border} borderBottomWidth={1} alignItems="center" justifyContent="space-between">
        <VStack flex={1}>
          <Text color={colors.white} h4 semibold >{p.title}</Text>
          {p.subTitle && <Text color={colors.grey400} h5 >{p.subTitle}</Text>}
        </VStack>
        <HStack space={2}>
          <CaretRight size={23} weight="bold" color={colors.white} />
        </HStack>
      </HStack>
    </Pressable>
  )
}

export default List