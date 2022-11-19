import React, { useState, useEffect } from 'react';
import { Box } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import Input from '@components/input';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@services/supabase';
import Toast from '@components/toast';
import ScrollingList from '@components/scrollingList';
import ListProfiles from './listProfiles';

const Index = () => { 
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
    .from('profiles').select(`*`)
    setLoading(false);
    data && (setData(data as any));
    error && Toast({ titulo: 'Erro', descricao: 'Não foi possível encontrar as empresas', type: 'danger' })
  }

  useEffect(() => {
    getProfiles();
    console.log(data)
  }, []);

  
  return (
    <>
      <Header px={5} pb={1} title='Bem vindo,' subtitle='Bruno Garcia' />
      <Box px="20px" flex={1} bg={colors.background}>
      <Input mt={5} mb={5} label='Nome' />

        <ScrollingList
          data={data}
          keyExtractor={(item: any) => item.id}
          refreshing={false}
          onRefresh={getProfiles}
          emptyText="Nenhuma empresa encontrada"
          separator={3}
          loading={loading}
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