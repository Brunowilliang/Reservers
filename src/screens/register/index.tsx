import React, { useState } from 'react'
import { Center, VStack } from 'native-base'
import { colors } from '@styles/theme'
import { useNavigation } from '@react-navigation/native'
import 'react-native-url-polyfill/auto';
import Input from '@components/input'
import Button from '@components/button'

import { supabase } from '@services/supabase';
import Toast from '@components/toast';
import { api } from '@services/pocketbase';


const index = () => {
  const navigation = useNavigation();


  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ cnpj, setCpnj ] = useState('');

  
  async function handleRegister(){
    await api.collection('users').create({
      name,
      email,
      password,
      username,
      "passwordConfirm": password,
      "emailVisibility": true,
      phone,
      cpf,
      cnpj,
      'provider': false,
    }).then((response) => {
      Toast({ titulo: 'Cadastro realizado com sucesso', descricao: 'Faça o login para continuar', type: 'success' }),
      navigation.navigate('login');
    }).catch((error) => {
      console.log(error);
      Toast({titulo: 'Erro ao fazer o cadastro',descricao: 'Por favor, verifique seu e-mail e password.', type: 'danger'})
    })
  }

  const voltar = () => {
    navigation.goBack();
  }

  return (
    <Center flex={1} px="20px" bg={colors.background}>
      <VStack space="10px" w="100%" mt="30px">
        <Input label='Nome completo' onChangeText={setName} />
        <Input label='E-mail' onChangeText={setEmail} />
        <Input password label='password' onChangeText={setPassword} />
        <Input label='Celular' onChangeText={setPhone} />
        <Input label='CPF' onChangeText={setCpf} />
        <Input label='CNPJ' onChangeText={setCpnj} />
      </VStack>
      <VStack space="10px" w="100%" mt="30px">
        <Button title='Registrar' onPress={handleRegister}/>
        <Button title='voltar' variant='secondary' onPress={voltar}/>
      </VStack>
    </Center>
  )
}

export default index