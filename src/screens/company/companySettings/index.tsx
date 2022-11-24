import React, { useState } from 'react';
import { Container, ScrollView } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import Text from '@components/text';
import List from '@components/list';
import { useAuth } from '@hooks/useAuth';

const Index = () => { 
  const navigation = useNavigation();
  const { handleLogout } = useAuth();

  return (
    <>
      <Header px={5} pb={5} title='Configurações da' subtitle='empresa' />
      <ScrollView showsVerticalScrollIndicator={false} px="20px" flex={1} bg={colors.background}>
        <List title="Meus dados" onPress={() => navigation.navigate('userProfile')} />
        <List title="Dados da empresa" onPress={() => navigation.navigate('companyProfile')} />
        <List title="Horário de atendimento" onPress={() => navigation.navigate('companySettingsHours')} />
        <List title="Profissionais"  onPress={() => navigation.navigate('companyProfessionals')} />
        <List title="Fale conosco" />
        <List title="Sair" onPress={handleLogout} />
        <Text color={colors.grey600} h5 semibold py={4}>Versão 1.0.0</Text>
      </ScrollView>
    </>
  )
}

export default Index;