import React from 'react';
import Text from '@components/text';
import Pressable from '@components/pressable';
import { colors } from '@styles/theme';
import { Box } from 'native-base';
import { TrendUp, TrendDown } from 'phosphor-react-native';
import { maskBRL } from '@components/input';

type Props = {
  nome?: string;
  valor?: number | string;
  data?: string;
  icon?: 'up' | 'down';
  total?: boolean;
}

const Card = ( p:Props ) => {
  return (
    <Pressable bg={p.total ? colors.primary : colors.secondary} rounded={"14px"} w="230px" alignItems="flex-start" p={4} position="relative">
      <Text h4 semibold color={p.total ? colors.white : colors.grey400}>{p.nome}</Text>
      <Text h1 bold color={p.total ? colors.white : p.icon === 'up' ? colors.success : colors.attention}>{p.valor}</Text>
      <Text h5 medium color={p.total ? colors.white : colors.grey600}>{p.data}</Text>
      <Box position="absolute" top={4} right={4}>
        {p.icon === 'up' && (
          <TrendUp size={30} weight="bold" color={colors.success} />
        )}
        {p.icon === 'down' && (
          <TrendDown size={30} weight="bold" color={colors.attention} />
        )}
      </Box>
    </Pressable>
  )
}

export default Card;