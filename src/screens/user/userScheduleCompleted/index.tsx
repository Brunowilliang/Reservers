import React from 'react';
import { Box } from 'native-base';
import { colors } from '@styles/theme';
import 'moment/locale/pt-br';
import Button from '@components/button';
import Text from '@components/text';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  
  return (
    <Box safeArea flex={1} px={5} alignItems="center" justifyContent="center" bg={colors.background}>
      <Box mb="-100px" mt="100px">
        <LottieView
          autoPlay
          loop={false}
          duration={3000}
          resizeMode="cover"
          style={{
            height: 400,
            backgroundColor: colors.background,
          }}
          source={require('@assets/check.json')}
        />
      </Box>
      <Box flex={1} w="100%">
        <Text h1 bold color={colors.grey400} textAlign="center" mb={5}>{`Agendamento\nrealizado`}</Text>
        <Button title="Ir para meus agendamentos" onPress={() => navigation.navigate('userSchedules')}/>
      </Box>
    </Box>
  )
}

export default Index;