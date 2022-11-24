import React from 'react'
import Text from '@components/text';
import { colors } from '@styles/theme';
import { Box, IBoxProps } from 'native-base';
import Pressable from './pressable';
import { CaretLeft } from 'phosphor-react-native';
import MenuOptions from './menuOptions';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';

type Props = IBoxProps & {
  back?: boolean;
  sair?: boolean;
  title?: string;
  subtitle?: string;
  right?: any;
}


const Header = (p: Props) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const voltar = () => navigation.goBack();

  return (
    <Box safeAreaTop bg={colors.background} flexDir="row" justifyContent="space-between" alignItems="center" py={5} {...p}>
      {p.back && (
        <Pressable onPress={voltar} pr={3}>
          <CaretLeft size={25} weight="bold" color={colors.white} />
        </Pressable>
      )}

      <Box flex={1}>
        <Text h2 medium color={colors.white}>{p.title}</Text>
        <Text h2 bold mt={-1} color={colors.white}>{p.subtitle}</Text>
      </Box>

      {p.right && (
        <Box>
          {p.right}
        </Box>
      )}
    </Box>
  )
}


export default Header