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
  const { loginUser, loginCompany } = useAuth();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');


  async function login(){
    loginUser('bruno', 'bruno123');
  }

  async function company(){
    loginCompany('tiago', 'bruno123');
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
        <Input autoCapitalize='none' label='E-mail' onChangeText={(text) => setEmail(text)} />
        <Input password label='Senha' onChangeText={(text) => setPassword(text)} />
      </VStack>
      <VStack space="10px" w="100%" mt="30px">
        <Button title='Entrar como usuário' onPress={login} />
        <Button title='Entrar como Empresa' onPress={company} />
        {/* <Button variant='secondary' title='Registrar' onPress={registrar}/> */}
        {/* <Button variant='secondary' title='Recuperar password' onPress={handleForgotPassword}/> */}
      </VStack>
    </Center>
  )
}

export default index