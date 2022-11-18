import React, { useState } from 'react'
import { Center, VStack } from 'native-base'
import { colors } from '@styles/theme'
import { useNavigation } from '@react-navigation/native'
import 'react-native-url-polyfill/auto';
import Input from '@components/input'
import Button from '@components/button'

import { supabase } from '@services/supabase';
import Toast from '@components/toast';


const index = () => {
  const navigation = useNavigation();


  const [ nome, setNome ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ celular, setCelular ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ cnpj, setCpnj ] = useState('');

  
  async function handleRegister(){
    const { user, error } = await supabase.auth.signUp(
      { email, password: senha },
      { data: {
          nome,
          celular,
          cpf,
          cnpj,
        },
      },
    )
    user && (
      navigation.navigate('login'),
      Toast({ titulo: 'Cadastro realizado com sucesso', type: 'success' })
    )
    error && (
      console.log(error),
      Toast({ titulo: 'Erro ao fazer o cadastro', type: 'danger' })
    )
  }

  const voltar = () => {
    navigation.goBack();
  }

  return (
    <Center flex={1} px="20px" bg={colors.background}>
      <VStack space="10px" w="100%" mt="30px">
        <Input label='Nome completo' onChangeText={setNome} />
        <Input label='E-mail' onChangeText={setEmail} />
        <Input password label='Senha' onChangeText={setSenha} />
        <Input label='Celular' onChangeText={setCelular} />
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