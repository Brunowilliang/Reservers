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
  const { user, setUser, handleLogout } = useAuth();

  
  const [name, setName] = useState(() => user?.expand?.company?.name || '');
  const [phone, setPhone] = useState(() => user?.expand?.company?.phone || '');
  const [road, setRoad] = useState(() => user?.expand?.company?.road || '');
  const [number, setNumber] = useState(() => user?.expand?.company?.number || '');
  const [district, setDistrict] = useState(() => user?.expand?.company?.district || '');
  const [zipcode, setZipcode] = useState(() => user?.expand?.company?.zipcode || '');
  const [complement, setComplement] = useState(() => user?.expand?.company?.complement || '');
  const [city, setCity] = useState(() => user?.expand?.company?.city || '');
  const [state, setState] = useState(() => user?.expand?.company?.state || '');
  const [country, setCountry] = useState(() => user?.expand?.company?.country || '');


  const updateCompany = async () => {
    const data: CompanyRecord = {
      name,
      phone,
      road,
      number,
      district,
      zipcode,
      complement,
      city,
      state,
      country,
    }

    await api.collection(Collections.Company).update(user?.expand?.company?.id, data).then((response) => {
      setUser({ ...user, expand: { ...user?.expand, company: response } });
      Toast({ titulo: 'Sucesso!', descricao: 'Dados atualizados com sucesso', type: 'success' });
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Não foi possível atualizar os dados', type: 'warning' });
    });
  }
  




  return (
    <>
      <Header back title='Dados' subtitle='da empresa' px={5} pb={2} />
      <ScrollView flex={1} bg={colors.background}>
        <VStack safeAreaBottom space={3} px={5}>
          <Input label='Nome da empresa' value={name} onChangeText={setName} />
          <Input label='Seu telefone' value={phone} onChangeText={setPhone} />
          <Input label='Rua' value={road} onChangeText={setRoad} />
          <Input label='Número' value={number} onChangeText={setNumber} />
          <Input label='Bairro' value={district} onChangeText={setDistrict} />
          <Input label='CEP' value={zipcode} onChangeText={setZipcode} />
          <Input label='Complemento' value={complement} onChangeText={setComplement} />
          <Input label='Cidade' value={city} onChangeText={setCity} />
          <Input label='Estado' value={state} onChangeText={setState} />
          <Input label='País' value={country} onChangeText={setCountry} />

          <Button title='Atualizar' mt={5} onPress={updateCompany} />
          <Button title='Sair' variant='secondary' onPress={handleLogout} />
        </VStack>
      </ScrollView>
    </>
  )
}

export default Index;