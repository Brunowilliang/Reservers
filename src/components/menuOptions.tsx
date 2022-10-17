import React from 'react'
import { Box, Divider, Menu, Pressable as Button, VStack } from 'native-base';
import { colors } from '@styles/theme';
import Text from './text';
import { DotsThreeVertical } from 'phosphor-react-native';
import Pressable from './pressable';
import { TouchableOpacity } from 'react-native';

type Props = {
  iconName?: string,
  iconColor?: string,
  iconSize?: number,
  Icon?: Element | JSX.Element,
  items?: Array<{
    nome?: string,
    onPress?: () => void
  }>,
}

const overlay: any = {
  style: {
    backgroundColor: '#000000',
  },
}

const MenuOptions = (p: Props) => {
  return (
    <Menu p={0} overflow="hidden" rounded="8px" bg={colors.grey700} placement={'bottom right'} _backdrop={overlay} trigger={triggerProps => {
      return (
        <TouchableOpacity {...triggerProps}>
          {p.Icon}
        </TouchableOpacity>
      );
    }}>
    {p.items?.map(({ nome, onPress }, index) => {
      return (
        <Box key={index}>
          <Menu.Item flex={1} onPress={onPress} px="20px" py="15px" _pressed={{bgColor: colors.grey600}} >
            <Text h4 medium color={colors.grey400}>{nome}</Text>
          </Menu.Item>
          {index < p.items.length - 1 &&  <Divider bg={colors.grey600} />}
        </Box>
        )
      })}
      
    </Menu>
  )
}

export default MenuOptions
