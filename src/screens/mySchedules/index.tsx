import React, { useEffect, useState } from 'react';
import { Box, FlatList, SectionList } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import { useNavigation, useRoute } from '@react-navigation/native';
import Text from '@components/text';
import { supabase } from '@services/supabase';
import Toast from '@components/toast';
import ListSchedules from './listSchedules';
import moment from 'moment';
import { RefreshControl } from 'react-native';
import { useAxios } from '@services/axios';
import { User, Schedules } from '@utils/types';

const Index = () => { 
  const navigation = useNavigation();

  const [{ data, loading, error }, Refetch ] = useAxios<Schedules>({
    url: `schedules/records?expand=provider,user,professional,service`,
    method: 'GET',
  })
  if (error) {
    Toast({ titulo: 'Ops!', descricao: 'Nenhum agendamento encontrado', type: 'warning' });
    console.log(error);
  }
  if (data) console.log(
    JSON.stringify(data, null, 1)
  );

  
  return (
    <>
      <Header title='Bem vindo,' subtitle='Bruno Garcia' px={5} pb={2} />
      <Box px={5} flex={1} bg={colors.background}>
        <FlatList
          data={data?.items}
          refreshControl={
            <RefreshControl
              tintColor={colors.white}
              refreshing={false}
              onRefresh={() => Refetch()}
            />
          }
          ListEmptyComponent={
            <Text h5 mt={5} bold color={colors.grey400}>{loading ? 'Carregando...' : 'Nenhum agendamento encontrado'}</Text>
          }
          renderItem={({ item }) => (
            <ListSchedules
            disabled={ item?.day >= moment().format('DD/MM/YYYY') ? false : true }
            status={ item?.day >= moment().format('DD/MM/YYYY') ? 'Agendado' : 'Inativo' } mb={3} item={item} onPress={ () => {} } />
          )}
        />

      </Box>
    </>
  )
}

export default Index;