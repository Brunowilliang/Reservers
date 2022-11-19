import React, { useEffect, useState } from 'react';
import { Box, ScrollView, SectionList } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import Text from '@components/text';
import { Profiles, Schedules } from '@services/types';
import { supabase } from '@services/supabase';
import Toast from '@components/toast';
import ScrollingList from '@components/scrollingList';
import ListSchedules from './listSchedules';
import moment from 'moment';
import { RefreshControl } from 'react-native';

const Index = () => { 
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const getSchedules = async () => {
    const { data, error } = await supabase
    .from('schedules')
    .select(`*, profiles:profile_id(*), professionals:professional_id(*), services:service_id(*), users:user_id(*)`)
    error && console.log(error)
    data && (setData(data as any));
  }

  useEffect(() => {
    getSchedules();
    console.log(filterSchedulesAfter)
  }, []);

  
  const filterSchedulesAfter = data.filter((item: Schedules) => {
    return item.day as any >= moment().format('DD/MM/YYYY');
  });
  
  const filterSchedulesBefore = data.filter((item: Schedules) => {
    return item?.day as any < moment().format('DD/MM/YYYY');
  })

  
  return (
    <>
      <Header title='Bem vindo,' subtitle='Bruno Garcia' px={5} pb={2} />
      <Box px={5} flex={1} bg={colors.background}>
        <SectionList
          refreshControl={
            <RefreshControl
              tintColor={colors.white}
              refreshing={false}
              onRefresh={getSchedules}
            />
          }
          sections={
            data.length > 0 ? [
              { title: 'Proximos agendamentos', data: filterSchedulesAfter.sort((a: any, b: any) => a.day > b.day ? 1 : -1) },
              { title: 'Agendamentos anteriores', data: filterSchedulesBefore.sort((a: any, b: any) => a.day > b.day ? -1 : 1) },
            ] : []
          }
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item: any, index: any) => item + index}
          ListEmptyComponent={
            <Text h5 mt={5} bold color={colors.grey400}>Nenhum agendamento encontrado</Text>
          }
          renderItem={({ item }) => (
            <ListSchedules
            disabled={ item?.day >= moment().format('DD/MM/YYYY') ? false : true }
            colorBadge={ item?.day >= moment().format('DD/MM/YYYY') ? colors.success : colors.attention } mb={3} item={item} onPress={ () => {} } />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Box mt={5} mb={2}>
              <Text h2 bold color={colors.grey400}>{title}</Text>
            </Box>
          )}
        />

      </Box>
    </>
  )
}

export default Index;