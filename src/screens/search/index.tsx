import React, {  } from 'react';
import { Box, FlatList } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import Input from '@components/input';
import { useNavigation } from '@react-navigation/native';
import Toast from '@components/toast';
import ListProfiles from './listProfiles';
import { RefreshControl } from 'react-native';
import Text from '@components/text';
import { useAxios } from '@services/axios';

const Index = () => { 
  const navigation = useNavigation();

  const [{ data: users, loading, error }, refetch ] = useAxios({
    url: '/users/records', method: 'GET',
  })
  if (error) Toast({ titulo: 'Ops!', descricao: 'Nenhuma empresa encontrada', type: 'warning' });

  return (
    <>
      <Header px={5} pb={1} title='Bem vindo,' subtitle='Bruno Garcia' />
      <Box px="20px" flex={1} bg={colors.background}>
      <Input mt={5} mb={5} label='Nome' />

        <FlatList
          data={users?.items}
          keyExtractor={(item: any) => item.id}
          ItemSeparatorComponent={() => <Box h={3} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={colors.white}
              refreshing={loading}
              onRefresh={refetch}
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