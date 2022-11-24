import React, { useEffect, useState } from 'react';
import { Box, HStack, ScrollView, VStack, Wrap } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import Input from '@components/input';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/button';
import { api } from '@services/pocketbase';
import { Collections, CompanyRecord } from '@utils/types';
import Toast from '@components/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '@components/text';

const Index = () => { 
  const navigation = useNavigation();
  const { user, setUser, handleLogout } = useAuth();


  return (
    <>
      <Header back title='Definir horários' subtitle='de atendimento' px={5} pb={2} />
      <ScrollView flex={1} bg={colors.background} px={5}>
        <VStack safeAreaBottom space={3} mt={5} >
          <Text h4 bold textAlign='center'>{`Defina o horário de atendimento\nna parte da manhã`}</Text>
          <HStack space={3} alignItems="center">
            <Input flex={1} label='Abertura' value='08:00'/>
            <Text h4 bold textAlign='center'>às</Text>
            <Input flex={1} label='Almoço' value='12:00'/>
          </HStack>
          <Text h4 bold mt={5} textAlign='center'>{`Defina o horário de atendimento\nna parte da tarde`}</Text>
          <HStack space={3} alignItems="center">
            <Input flex={1} label='Abertura' value='08:00'/>
            <Text h4 bold textAlign='center'>às</Text>
            <Input flex={1} label='Almoço' value='12:00'/>
          </HStack>
        </VStack>
        <Button title='Salvar' onPress={() => navigation.goBack()} />
      </ScrollView>
    </>
  )
}

export default Index;