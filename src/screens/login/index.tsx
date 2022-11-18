import React, { useState } from 'react'
import { Center, VStack } from 'native-base'
import { colors } from '@styles/theme'
import { useNavigation } from '@react-navigation/native'
import Input from '@components/input'
import Button from '@components/button'
import { supabase } from '@services/supabase';
import Toast from '@components/toast';
// import Logo from '@assets/logo.svg'


const index = () => {
  const navigation = useNavigation();

  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');

  async function handleLogin(){
    const { user, error } = await supabase.auth.signIn({
      email,
      password: senha,
    })
    user && (
      Toast({ titulo: 'Login realizado com sucesso', descricao: `Bem vindo ${user?.user_metadata?.nome}`, type: 'success' }),
      navigation.navigate('search')
    )
    error && (
      console.log(error),
      Toast({titulo: 'Erro ao fazer o login',descricao: 'Por favor, verifique seu e-mail e senha.',type: 'danger'})
    )
  }

  async function handleForgotPassword(){
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
    data && (
      Toast({ titulo: 'E-mail enviado com sucesso', descricao: 'Por favor, verifique sua caixa de entrada.', type: 'success' })
    )
    error && (
      console.log(error),
      Toast({ titulo: 'Erro ao enviar o e-mail', descricao: 'Por favor, verifique seu e-mail.', type: 'danger' })
    )
  }


  const registrar = () => {
    navigation.navigate('register')
  }

  // async function deleteUser(){
  //   const { data: user, error } = await supabase.auth.api.deleteUser(
  //     '7229f660-f8ba-45f1-bc6d-cdbf4d216fcb'
  //   )
  //   user && (
  //     Toast({ titulo: 'Usuário deletado com sucesso', type: 'success' })
  //   )
  //   error && (
  //     Toast({ titulo: 'Erro ao deletar o usuário', type: 'danger' })
  //   )
  // }
  


  return (
    <Center flex={1} px="20px" bg={colors.background}>
      {/* <Logo /> */}
      <VStack space="10px" w="100%" mt="30px">
        <Input label='E-mail' onChangeText={setEmail}/>
        <Input password label='Senha' onChangeText={setSenha} />
      </VStack>
      <VStack space="10px" w="100%" mt="30px">
        <Button title='Entrar' onPress={handleLogin} />
        <Button variant='secondary' title='Registrar' onPress={registrar}/>
        <Button variant='secondary' title='Recuperar senha' onPress={handleForgotPassword}/>
        {/* <Button variant='secondary' title='DeletarUsuário' onPress={deleteUser}/> */}
      </VStack>
    </Center>
  )
}

export default index