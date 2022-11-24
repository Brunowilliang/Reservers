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

const Index = () => { 
  const navigation = useNavigation();
  const { company, logoutCompany } = useAuth();

  
  const [name, setName] = useState(() => company.name || '');
  const [phone, setPhone] = useState(() => company.phone || '');
  const [adress, setAdress] = useState(() => company.adress || '');
  const [number, setNumber] = useState(() => company.number || '');
  const [district, setDistrict] = useState(() => company.district || '');
  const [zipcode, setZipcode] = useState(() => company.zipcode || '');
  const [city, setCity] = useState(() => company.city || '');
  const [state, setState] = useState(() => company.state || '');
  const [country, setCountry] = useState(() => company.country || '');


  const updateCompany = async () => {
    const data: CompanyRecord = {
      name,
      phone,
      adress,
      number,
      district,
      zipcode,
      city,
      state,
      country,
    }

    await api.collection(Collections.Company).update(company.id, data).then((response) => {
      Toast({ titulo: 'Sucesso!', descricao: 'Dados atualizados com sucesso', type: 'success' });
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Não foi possível atualizar os dados', type: 'warning' });
    });
  }
  




  return (
    <>
      <Header back title='Dados' subtitle='da empresa' px={5} />
      <ScrollView flex={1} bg={colors.background}>
        <VStack safeAreaBottom space={3} px={5}>
          <Input label='Nome da empresa' value={name} onChangeText={setName} />
          <Input label='Seu telefone' value={phone} onChangeText={setPhone} />
          <HStack  space={3}>
            <Input flex={1} label='Endereço' value={adress} onChangeText={setAdress} />
            <Input w={'30%'} label='Nº' value={number} onChangeText={setNumber} />
          </HStack>
          <HStack  space={3}>
          <Input flex={1} label='Bairro' value={district} onChangeText={setDistrict} />
          <Input flex={1} label='CEP' value={zipcode} onChangeText={setZipcode} />
          </HStack>

          <HStack  space={3}>
            <Input flex={1} label='Cidade' value={city} onChangeText={setCity} />
            <Input w={'30%'} label='Estado' value={state} onChangeText={setState} />
          </HStack>
          <Input label='País' value={country} onChangeText={setCountry} />

          <Button title='Atualizar' mt={5} onPress={updateCompany} />
          <Button title='Sair' variant='secondary' onPress={logoutCompany} />
        </VStack>
      </ScrollView>
    </>
  )
}

export default Index;