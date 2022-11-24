import React from 'react';
import Text from '@components/text';
import Pressable from '@components/pressable';
import { colors } from '@styles/theme';
import { HStack, IPressableProps, VStack } from 'native-base';
import { CaretRight } from 'phosphor-react-native';
import moment from 'moment';
import { SchedulesResponse } from '@utils/types';

type Props = IPressableProps & {
  onPress: () => void;
  disabled?: boolean;
  item: SchedulesResponse;
  variant?: 'primary' | 'secondary';
  status?: string;
}

const listProfiles = ( p: Props ) => {
  return (
    <Pressable bg={colors.secondary} disabled={p.disabled} rounded={"14px"} alignItems="flex-start" py={3} px={5} {...p}>
      <HStack space={4} alignItems="center">
        <VStack flex={1}>
          <Text h3 numberOfLines={1} bold color={colors.grey400}>{p.item?.expand?.company.name}</Text>
          <Text h5 numberOfLines={1} medium color={colors.grey400}>{p.item?.expand?.professional.name}</Text>
          <Text h5 numberOfLines={1} medium color={colors.grey400}>{p.item?.expand?.service.name}</Text>
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