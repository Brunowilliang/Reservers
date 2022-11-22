import React, { useState } from 'react'
import { Center, VStack, Image, Box } from 'native-base'
import { colors } from '@styles/theme'
import { useNavigation } from '@react-navigation/native'
import Input from '@components/input'
import Button from '@components/button'
import Toast from '@components/toast';
import { api } from '@services/pocketbase'
import { useAuth } from '@hooks/useAuth'
import Logo from '@assets/logo.png';


const index = () => {
  const navigation = useNavigation();
  const { handleLogin } = useAuth();

  const [ email, setEmail ] = useState('brunowilliang@icloud.com');
  const [ password, setPassword ] = useState('bruno123');

  async function login(){
    if(!email || !password){
      Toast({titulo: 'Erro ao fazer o login',descricao: 'Por favor, verifique seu e-mail e password.', type: 'danger'})
      return;
    }
    handleLogin(email, password);
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
      <Box height={75} width="full" alignItems="center">
        <Image source={Logo} alt='logo' size={150} flex={1} />
      </Box>
      <VStack space="10px" w="100%" mt="30px">
        <Input autoCapitalize='none' label='E-mail' onChangeText={setEmail}/>
        <Input password label='Senha' onChangeText={setPassword} />
      </VStack>
      <VStack space="10px" w="100%" mt="30px">
        <Button title='Entrar' onPress={login} />
        <Button variant='secondary' title='Registrar' onPress={registrar}/>
        <Button variant='secondary' title='Recuperar password' onPress={handleForgotPassword}/>
      </VStack>
    </Center>
  )
}

export default index