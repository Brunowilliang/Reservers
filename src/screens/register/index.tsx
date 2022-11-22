import React, { useState } from 'react'
import { Center, VStack } from 'native-base'
import { colors } from '@styles/theme'
import { useNavigation } from '@react-navigation/native'
import 'react-native-url-polyfill/auto';
import Input from '@components/input'
import Button from '@components/button'

import Toast from '@components/toast';
import { api } from '@services/pocketbase';
import Tabs from '@components/tabs';


const index = () => {
  const navigation = useNavigation();

  const [tabs, setTabs] = useState({
    selected: 0,
    options: [
      { label: "Usuário", value: "usuario" },
      { label: "Empresa", value: "empresa" }
    ]
  })

  const selectTab = (value: string) => {
    setTabs({
      ...tabs,
      selected: tabs.options.findIndex((item) => item.value === value)
    })
  }


  const [user, setUser] = useState({
    username: "",
    email: "",
    emailVisibility: true,
    password: "",
    passwordConfirm: "",
    company_name: "",
    name: "",
    phone: "",
    cpf: "",
    cnpj: "",
    // provider: true,
    city: ""
  })
  
  async function handleRegister(){
    await api.collection('users').create({
      username: user.username || "",
      email: user.email || "",
      password: user.password || "",
      company_name: user.company_name || "",
      name: user.name || "",
      phone: user.phone || "",
      cpf: user.cpf || "",
      cnpj: user.cnpj || "",
      provider: tabs.selected === 0 ? false : true,
      city: user.city || ""
    }).then((response) => {
      Toast({ titulo: 'Cadastro realizado com sucesso', descricao: 'Faça o login para continuar', type: 'success' }),
      navigation.navigate('login');
    }).catch((error) => {
      console.log(error.response);
      Toast({titulo: 'Erro ao fazer o cadastro',descricao: 'Por favor, verifique seu e-mail e password.', type: 'danger'})
    })
  }

  const voltar = () => {
    navigation.goBack();
  }

  return (
    <Center flex={1} px="20px" bg={colors.background}>
      <Tabs onPress={selectTab as any} initial={tabs.selected} options={tabs.options} />
      <VStack space="10px" w="100%" mt="30px">
        <Input label='Usuário' onChangeText={(text) => setUser({ ...user, username: text })} />
        <Input label='Nome completo' onChangeText={(text) => setUser({ ...user, name: text })} />
        <Input label='E-mail' onChangeText={(text) => { setUser({ ...user, email: text })}} />
        <Input password label='password' onChangeText={(text) => { setUser({ ...user, password: text })}} />
        <Input label='Celular' invisible={tabs.selected === 0} onChangeText={(text) => { setUser({ ...user, phone: text })}} />
        <Input label='CPF' invisible={tabs.selected === 0} onChangeText={(text) => { setUser({ ...user, cpf: text })}} />
        <Input label='CNPJ' invisible={tabs.selected === 0} onChangeText={(text) => { setUser({ ...user, cnpj: text })}} />
      </VStack>
      <VStack space="10px" w="100%" mt="30px">
        <Button title='Registrar' onPress={handleRegister}/>
        <Button title='voltar' variant='secondary' onPress={voltar}/>
      </VStack>
    </Center>
  )
}

export default index