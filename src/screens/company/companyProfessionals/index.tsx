import React, { useEffect, useState } from 'react';
import { Box, FlatList, HStack, ScrollView, VStack } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import Input from '@components/input';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/button';
import Text from '@components/text';
import { api } from '@services/pocketbase';
import { Collections, ProfessionalsRecord, ProfessionalsResponse } from '@utils/types';
import Card from './card';

const Index = () => { 
  const navigation = useNavigation();
  const { user } = useAuth();

  const [professionals, setProfessionals] = useState<ProfessionalsResponse[]>([]);


  const getProfessionals = async () => {
    await api.collection(Collections.Professionals).getFullList<ProfessionalsResponse>(200, {
      filter: `company = "${user?.expand?.company?.id}"`,
      sort: '-created',
    }).then((response) => {
      setProfessionals(response);
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => { getProfessionals() }, []);



  return (
    <>
      <Header back title='Selecione o' subtitle='profissional' px={5} pb={2} />
      <Box flex={1} bg={colors.background} px={5}>
        <FlatList
          data={professionals as ProfessionalsResponse[]}
          renderItem={({ item }) => (
            <Card item={item} onPress={() => {}} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </>
  )
}

export default Index;