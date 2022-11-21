import React, { useState } from 'react'
import { Center, VStack } from 'native-base'
import { colors } from '@styles/theme'
import { useNavigation } from '@react-navigation/native'
import Input from '@components/input'
import Button from '@components/button'
import { supabase } from '@services/supabase';
import Toast from '@components/toast';
import { api } from '@services/pocketbase'
// import Logo from '@assets/logo.svg'


const index = () => {
  const navigation = useNavigation();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  async function handleLogin(){
    await api.collection('users').authWithPassword(
      email,
      password
    ).then((response) => {
      Toast({ titulo: 'Login realizado com sucesso', descricao: 'Bem vindo ao Pocketbase', type: 'success' }),
      navigation.navigate('home');
    }).catch((error) => {
      console.log(error);
      Toast({titulo: 'Erro ao fazer o login',descricao: 'Por favor, verifique seu e-mail e password.', type: 'danger'})
    })
  }


  async function handleForgotPassword(){
    await api.collection('users').requestPasswordReset(email)
    .then((response) => {
      console.log(response);
      Toast({ titulo: 'Email enviado com sucesso', descricao: 'Verifique sua caixa de entrada', type: 'success' })
    }).catch((error) => {
      console.log(error);
      Toast({titulo: 'Erro ao enviar o email',descricao: 'Por favor, verifique seu e-mail e password.',type: 'danger'})
    })
  }

  const registrar = () => {
    navigation.navigate('register')
  }


  return (
    <Center flex={1} px="20px" bg={colors.background}>
      {/* <Logo /> */}
      <VStack space="10px" w="100%" mt="30px">
        <Input label='E-mail' onChangeText={setEmail}/>
        <Input password label='password' onChangeText={setPassword} />
      </VStack>
      <VStack space="10px" w="100%" mt="30px">
        <Button title='Entrar' onPress={handleLogin} />
        <Button variant='secondary' title='Registrar' onPress={registrar}/>
        <Button variant='secondary' title='Recuperar password' onPress={handleForgotPassword}/>
        {/* <Button variant='secondary' title='DeletarUsuário' onPress={deleteUser}/> */}
      </VStack>
    </Center>
  )
}

export default index