import React, { useState } from 'react';
import { Image, ScrollView, Spacer, VStack } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import Text from '@components/text';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/button';
import Input from '@components/input';
import Toast from '@components/toast';
import { api } from '@services/pocketbase';
import { Collections } from '@utils/types';


const Index = () => { 
  const navigation = useNavigation();
  const { user, setUser, logoutUser } = useAuth();

  const [username, setUsername] = useState(() => user?.username || '');
  const [name, setName] = useState(() => user?.name || '');

  const updateUser = async () => { await api.collection(Collections.Users).update(user?.id, {
    username,
    name,
  }).then((response) => {
    setUser(response.record as any);
    Toast({ titulo: 'Sucesso!', descricao: 'Dados atualizados com sucesso.', type: 'success' });
  }
  ).catch((error) => {
    console.log(error);
    Toast({ titulo: 'Ops!', descricao: 'Não foi possível atualizar seus dados.', type: 'warning' });
  }) 
}  

  return (
    <> 
      <Header title='Bem vindo,' subtitle={user.name} back px={5} pb={2} />
      <ScrollView px={5} flex={1} bg={colors.background}>
        <VStack space={3} w="100%" alignItems="center">
          <Image source={{ uri: `https://reserves.fly.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}` }} alt='avatar' size={170} rounded='full' mt={5} />
          <Text h2 bold color={colors.grey400} mt={5} mb={3}>Meus dados</Text>
          <Input label='Username' value={username} onChangeText={setUsername} />
          <Input label='Nome' value={name} onChangeText={setName} />
          {/* <Input label='Email' value={email} onChangeText={setEmail} /> */}
        </VStack>
        <Spacer />
        <Button title='Atualizar' mt={5} mb={2} onPress={updateUser} />
        <Button title='Sair' variant='secondary' onPress={logoutUser} />
      </ScrollView>
    </>
  )
}

export default Index;