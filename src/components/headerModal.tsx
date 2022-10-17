import React, { useCallback } from 'react'
import { Box, HStack, IBoxProps } from 'native-base'
import MenuOptions from './menuOptions'
import Text from './text'
import { colors } from '@styles/theme'
import { useNavigation } from '@react-navigation/native'
import { CaretDown } from 'phosphor-react-native'
import Pressable from './pressable'

interface Props extends IBoxProps {
  title: string;
  onPress?: () => void;
  // tipar o right como um componente react que recebe um onPress
  rightComponent?: React.ReactNode;
}

const HeaderModal = (p: Props) => {
  return (
    <Box py="20px" flexDir="row" alignItems="center" justifyContent="space-between" {...p}>
      <Box w="60px">
        <Pressable alignItems="flex-start" onPress={p.onPress}>
          <CaretDown size={25} weight="bold" color={colors.white} />
        </Pressable>
      </Box>
      <Text h3 semibold color={colors.white}>{p.title}</Text>
      <HStack w="60px" space={2} alignItems="center" justifyContent="flex-end" >
        {p.rightComponent} 
      </HStack>
    </Box>
  )
}

export default HeaderModal