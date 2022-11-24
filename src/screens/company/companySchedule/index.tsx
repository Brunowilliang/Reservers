import React, { useEffect, useState } from 'react';
import { Box, FlatList } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import Toast from '@components/toast';
import { RefreshControl } from 'react-native';
import Text from '@components/text';
import { Collections, SchedulesResponse, UsersResponse } from '@utils/types';
import { api } from '@services/pocketbase';
import { useAuth } from '@hooks/useAuth';
import ListSchedules from './listSchedules';
import moment from 'moment';

const Index = () => { 
  const navigation = useNavigation();
  const { company } = useAuth();

  const [schedules, setSchedules] = useState<SchedulesResponse[]>([]);
  const [loading, setLoading] = useState(false);


  const getSchedule = async () => {
    setLoading(true);
    await api.collection(Collections.Schedules).getFullList<SchedulesResponse>(200, {
      expand: 'company,user,professional,service',
      filter: `company = "${company?.id}"`,
      sort: '-created',
    }).then((response) => {
      setSchedules(response);
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhum agendamento encontrado', type: 'warning' });
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getSchedule();
  }, []);


  return (
    <>
      <Header px={5} pb={1} title='Bem vindo,' subtitle={company?.name} />
      <Box px="20px" flex={1} bg={colors.background}>
        <Text h3 mt={5} mb={5} bold color={colors.grey400}>Agenda do dia</Text>
        <FlatList
          data={schedules as SchedulesResponse[]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={colors.white}
              refreshing={loading}
              onRefresh={getSchedule}
            />
          }
          ListEmptyComponent={
            <Text h5 mt={5} textAlign="center" bold color={colors.grey400}>{loading ? 'Carregando...' : 'Nenhum agendamento encontrado'}</Text>
          }
          renderItem={({ item }) => (
            <ListSchedules
              disabled={ item?.day as any >= moment().format('DD/MM/YYYY') ? false : true }
              status={ item?.day as any >= moment().format('DD/MM/YYYY') ? 'Agendado' : 'Inativo' } mb={3} item={item} onPress={ () => {} } />
          )}
        />
      </Box>
    </>
  )
}

export default Index;