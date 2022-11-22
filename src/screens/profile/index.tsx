import React, { useEffect } from 'react';
import { Box, HStack, Image, Spacer } from 'native-base';
import { colors } from '@styles/theme';
import Header from '@components/header';
import { useNavigation } from '@react-navigation/native';
import Text from '@components/text';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/button';


const Index = () => { 
  const navigation = useNavigation();
  const { user, handleLogout } = useAuth();

  useEffect(() => {
  }, [user]);

  return (
    <>
      <Header title='Bem vindo,' subtitle='Bruno Garcia' px={5} pb={2} />
      <Box px={5} flex={1} alignItems="center" bg={colors.background}>
        <Image source={{ uri: `https://reserves.fly.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}` }} alt='avatar' size={170} rounded='full' mt={5} />
        <Text h2 bold color={colors.grey400} mt={5} mb={3}>Meus dados</Text>
        <HStack space={2}>
          <Text h5 medium color={colors.grey400}>Nome:</Text>
          <Text h5 semibold color={colors.grey400}>{user.name}</Text>
        </HStack>
        <HStack space={2}>
          <Text h5 medium color={colors.grey400}>Empresa:</Text>
          <Text h5 semibold color={colors.grey400}>{user.company_name}</Text>
        </HStack>
        <HStack space={2}>
          <Text h5 medium color={colors.grey400}>Telefone:</Text>
          <Text h5 semibold color={colors.grey400}>{user.phone}</Text>
        </HStack>
        <HStack space={2}>
          <Text h5 medium color={colors.grey400}>CNPJ:</Text>
          <Text h5 semibold color={colors.grey400}>{user.cnpj}</Text>
        </HStack>
        <HStack space={2}>
          <Text h5 medium color={colors.grey400}>CPF:</Text>
          <Text h5 semibold color={colors.grey400}>{user.cpf}</Text>
        </HStack>
        <Spacer />
        <Button title='Sair' mt={5} mb={5} onPress={handleLogout} />
      </Box>
    </>
  )
}

export default Index;