import React, { useEffect, useState } from 'react';
import { Box, FlatList, HStack, ScrollView, VStack } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import Input from '@components/input';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/button';
import Text from '@components/text';
import { api } from '@services/pocketbase';
import { Collections, ProfessionalsRecord, ProfessionalsResponse, ServicesResponse } from '@utils/types';
import Card from './card';

const Index = () => { 
  const navigation = useNavigation();
  const { company } = useAuth();

  const route = useRoute();
  const { item } = route.params as { item: ProfessionalsResponse };

  const [name, setName] = useState( () => item.name || '');
  
  
  
  const [services, setServices] = useState<ServicesResponse[]>([]);

  const getProfessionals = async () => {
    await api.collection(Collections.Services).getFullList<ServicesResponse>(200, {
      filter: `professional = "${item?.id}"`,
      sort: '-created',
    }).then((response) => {
      setServices(response);
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => { 
    getProfessionals()
   }, []);



  return (
    <>
      <Header back title='Cadastrar' subtitle='Profissional' px={5} />
      <Box safeAreaBottom pb={5} flex={1} bg={colors.background} px={5}>
        <VStack space={4} flex={1}>
          <Input label='Nome' value={name} onChangeText={setName} />
          <Text h3 bold color={colors.grey400} mt={5}>Serviços</Text>
          <FlatList
            data={services as ServicesResponse[]}
            renderItem={({ item }) => (
              <Card item={item} onPress={() => {}} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Box h={3} />}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
        <Button title='Salvar' onPress={() => {}} />
        <Button title='Excluir usuário' variant='secondary' onPress={() => {}} />
      </Box>
    </>
  )
}

export default Index;