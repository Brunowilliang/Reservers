import React from 'react';
import Text from '@components/text';
import Pressable from '@components/pressable';
import { colors } from '@styles/theme';
import { Box, HStack, IPressableProps, VStack } from 'native-base';
import { TrendUp, TrendDown, CaretRight } from 'phosphor-react-native';
import moment from 'moment';
import { maskBRL } from '@components/input';
import { Profiles, Schedules } from '@services/types';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

type Props = IPressableProps & {
  onPress: () => void;
  disabled?: boolean;
  item: Schedules;
  variant?: 'primary' | 'secondary';
  colorBadge?: string;
}

const StatusPulse = ({ colorBadge }: any) => {
  return (
    <Box alignItems="center" justifyContent="center">
      {[...Array(3).keys()].map((index) => {
        return (
          <MotiView
            key={index}
            from={{ opacity: 0.7, scale: 0 }}
            animate={{ opacity: 0, scale: 2.5 }}
            transition={{
              type: 'timing',
              duration: 2000,
              delay: index * 400,
              easing: Easing.out(Easing.ease),
              loop: true,
              repeatReverse: false,
            }}
            style={[StyleSheet.absoluteFillObject, {
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: colorBadge,
            }]}
          />
          )
        })}
        <Box w="10px" h="10px" bg={colorBadge} rounded="full" />
    </Box>
  )
}

const listProfiles = ( p: Props ) => {
  return (
    <Pressable bg={colors.secondary} disabled={p.disabled} rounded={"14px"} alignItems="flex-start" py={3} px={5} {...p}>
      <HStack space={4} alignItems="center">
        <VStack flex={1}>
          <Box flexDir="row" alignItems="center">
            <StatusPulse colorBadge={p.colorBadge} />
            <Text pl={2} h3 numberOfLines={1} bold color={colors.grey400}>{p.item.profiles?.name}</Text>
          </Box>
          <Text h5 numberOfLines={1} medium color={colors.grey400}>{p.item.services?.name}</Text>
          <Text h5 numberOfLines={1} medium color={colors.grey400}>{p.item.professionals?.name}</Text>

          {/* day as hour */}
          <Text h5 numberOfLines={1} medium color={colors.grey400}>
            {moment(p.item.day, 'DD/MM/YYYY').format('DD [de] MMM, YYYY')} às {p.item.hour}
          </Text>
        </VStack>
        <CaretRight size={25} weight="bold" color={colors.grey400} />
      </HStack>
    </Pressable>
  )
}

export default listProfiles;