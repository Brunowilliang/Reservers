import React, { useEffect, useState } from 'react';
import { Box, FlatList } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import Input from '@components/input';
import { useNavigation } from '@react-navigation/native';
import Toast from '@components/toast';
import ListProfiles from './listProfiles';
import { RefreshControl } from 'react-native';
import Text from '@components/text';
import { Collections, UsersResponse } from '@utils/types';
import { api } from '@services/pocketbase';

const Index = () => { 
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState<UsersResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const getProfiles = async () => {
    setLoading(true);
    await api.collection(Collections.Users).getFullList<UsersResponse>(200)
    .then((response) => {
      setProfiles(response);
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhuma empresa encontrada.', type: 'warning' });
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Header px={5} pb={1} title='Bem vindo,' subtitle='Bruno Garcia' />
      <Box px="20px" flex={1} bg={colors.background}>
      <Input mt={5} mb={5} label='Nome' />
        <FlatList
          data={profiles}
          keyExtractor={(item: any) => item.id}
          ItemSeparatorComponent={() => <Box h={3} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={colors.white}
              refreshing={loading}
              onRefresh={getProfiles}
            />
          }
          ListEmptyComponent={
              <Text h5 textAlign="center" pt={5} semibold color={colors.grey600}>{
                loading ? 'Carregando...' : 'Nenhum resultado encontrado'
              }</Text>
          }
          renderItem={({ item }: any) => (
            <ListProfiles
              item={item}
              onPress={ () => navigation.navigate('newSchedule', { item }) }
            />
          )}
        />

      </Box>
    </>
  )
}

export default Index;