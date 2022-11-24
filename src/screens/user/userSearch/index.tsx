import React, { useEffect, useState } from 'react';
import { Box, FlatList } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import Input from '@components/input';
import { useNavigation } from '@react-navigation/native';
import Toast from '@components/toast';
import Card from './card';
import { RefreshControl } from 'react-native';
import Text from '@components/text';
import { Collections, CompanyRecord } from '@utils/types';
import { api } from '@services/pocketbase';
import { useAuth } from '@hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => { 
  const navigation = useNavigation();
  const [company, setCompany] = useState<CompanyRecord[]>([] as CompanyRecord[]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getCompany = async () => {
    setLoading(true);
    await api.collection(Collections.Company).getFullList<CompanyRecord>(200)
    .then((response) => {
      setCompany(response);
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhuma empresa encontrada.', type: 'warning' });
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getCompany();
    console.log(JSON.stringify(user));
  }, [ ]);

  return (
    <>
      <Header px={5} title='Bem vindo,' subtitle={user?.name} />
      <Box px="20px" flex={1} bg={colors.background}>
      <Input mb={5} label='Nome' />
        <FlatList
          data={company}
          keyExtractor={(item: any) => item.id}
          ItemSeparatorComponent={() => <Box h={3} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={colors.white}
              refreshing={loading}
              onRefresh={getCompany}
            />
          }
          ListEmptyComponent={
              <Text h5 textAlign="center" pt={5} semibold color={colors.grey600}>{
                loading ? 'Carregando...' : 'Nenhum resultado encontrado'
              }</Text>
          }
          renderItem={({ item }: any) => (
            <Card item={item} onPress={ () => navigation.navigate('userNewSchedule', { item }) } />
          )}
        />

      </Box>
    </>
  )
}

export default Index;