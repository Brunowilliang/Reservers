import React, { useEffect, useState } from 'react';
import { Box, FlatList, VStack } from 'native-base';
import { colors } from '@styles/theme';
import 'moment/locale/pt-br';
import moment from 'moment';
import Calendar from '@components/calendarSplit';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '@components/button';
import Pressable from '@components/pressable';
import Text from '@components/text';
import Toast from '@components/toast';
import Header from '@components/header';
import { Collections, SchedulesResponse, UsersResponse, ProfessionalsResponse, ServicesResponse, CompanyResponse } from '@utils/types';
import { api } from '@services/pocketbase';
import { useAuth } from '@hooks/useAuth';

const Index = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute();
  const { item } = route.params as { item: CompanyResponse };

  const [selectedDate, setSelectedDate] = useState(moment());

  const [hours, setHours] = useState([] as any);
  const [selectedHour, setSelectedHour] = useState(null as any);
  
  const [selectedProfessional, setSelectedProfessional] = useState(null as any);
  const [selectedService, setSelectedService] = useState(null as any);
  const [serviceDuration, setServiceDuration] = useState(null as any);

  const [schedules, setSchedules] = useState<SchedulesResponse[]>([]);
  const [professionals, setProfessionals] = useState<ProfessionalsResponse[]>([]);
  const [services, setServices] = useState<ServicesResponse[]>([]);

  const getSchedule = async () => {
    await api.collection(Collections.Schedules).getFullList<SchedulesResponse>(200, {
      expand: 'service',
      filter: `day = "${selectedDate.format('DD/MM/YYYY')}"`,
      sort: '-created',
    }).then((response) => {
      setSchedules(response);
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhum agendamento encontrado', type: 'warning' });
    });
  }

  const getProfessional = async () => {
    await api.collection(Collections.Professionals).getFullList<ProfessionalsResponse>(200, {
      filter: `company = "${item.id}"`,
      sort: '-created',
    }).then((response) => {
      console.log(JSON.stringify(response, null, 2));
      setProfessionals(response);
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhum profissional encontrado', type: 'warning' });
    });
  }

  const getServices = async () => {
    await api.collection(Collections.Services).getFullList<ServicesResponse>(200, {
      expand: 'professional.company',
      filter: `professional.company.id = "${item.id}"`,
      sort: '-created',
    }).then((response) => {
      console.log(JSON.stringify(response, null, 2));
      setServices(response);
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhum serviço encontrado', type: 'warning' });
    });
  }

  const createSchedule = async () => {
    await api.collection(Collections.Schedules).create({
      "company": item.id,
      "user": user.id,
      "professional": selectedProfessional,
      "service": selectedService,
      "day": selectedDate.format('DD/MM/YYYY'),
      "hour": hours,
    }).then((response) => {
      navigation.navigate('userScheduleCompleted');
    }).catch((error) => {
      Toast({ titulo: 'Ops!', descricao: 'Erro ao criar agendamento', type: 'warning' });
      console.log(error);
    });
  }


  useEffect(() => {
    getSchedule();
    getProfessional();
    getServices();
  }, [selectedDate]);


  const INTERVAL = 10;
  const start = moment("08:00", "HH:mm");
  const startInicial = start.subtract(INTERVAL, "minutes");
  const lunchStart = moment("12:00", "HH:mm");
  const lunchEnd = moment("14:00", "HH:mm");
  const end = moment("18:00", "HH:mm");
  const valueHoursInicialLunch = lunchStart.format("HH:mm").split(":");
  const intHoursInicialLunch = parseInt(valueHoursInicialLunch[0]);
  const valueHoursEndLunch = lunchEnd.format("HH:mm").split(":");
  const intHoursEndLunch = parseInt(valueHoursEndLunch[0]);
  const totalLunch = intHoursEndLunch - intHoursInicialLunch;
  const valueHoursInicial = start.format("HH:mm").split(":");
  const intHoursInicial = parseInt(valueHoursInicial[0]);
  const valueHoursEnd = end.format("HH:mm").split(":");
  const intHoursEnd = parseInt(valueHoursEnd[0]);
  const total = intHoursEnd - intHoursInicial - 1;

  const AvaliableTimes = Array.from({ length: (total * 60) / INTERVAL }, (v) =>
    startInicial.add(INTERVAL, "minutes").format("HH:mm")
  );

  AvaliableTimes.splice(
    AvaliableTimes.indexOf(lunchStart.format("HH:mm")),
    (totalLunch * 60) / INTERVAL
  );

  schedules.map((x: any) => {
    AvaliableTimes.splice(
      AvaliableTimes.indexOf(x.hour),
      Math.round(x.expand.service.duration / INTERVAL)
    );
  });


  const handleSelectDate = (date: any) => {
    setSelectedDate(date);
    setHours([]);
  };

  const handleSelectProfessional = (id: string) => {
    if (selectedProfessional === id) {
      setSelectedProfessional(null);
      setHours([]);
    } else {
      setSelectedProfessional(id);
      setSelectedService(null);
      setSelectedHour(null);
      setHours([]);
    }
  };


  const handleSelectService = (id: string, duration: any) => {
    if (selectedService === id) {
      setSelectedService(null);
      setHours([]);
    } else {
      setSelectedService(id);
      setServiceDuration(duration);
    }
  };

  const handleSelectHour = (hour: string) => {
    setSelectedHour(hour);
  };

  const refresh = () => {
    setSelectedDate(moment());
    setSelectedProfessional(null);
    setSelectedService(null);
    setSelectedHour(null);
    setHours([]);
  }


  // useEffect(() => {
  //   console.log(JSON.stringify(schedule, null, 2))
  // }, [schedule]);



  return (
    <Box safeAreaBottom pb={5} flex={1} bg={colors.background}>
      <Header px={5} title='Novo agendamento,' subtitle={item?.name} back />
      <VStack space={5}>
        <Calendar
          style={{ height: 130 }}
          startingDate={selectedDate}
          selectedDate={selectedDate}
          onDateSelected={(date: any) => handleSelectDate(date)}
        />

        <FlatList
          data={professionals}
          horizontal
          display={selectedDate ? 'flex' : 'none'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => <Box w={2} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable px={3} py={2} rounded="10px" bg={selectedProfessional === item.id ? colors.primary : colors.secondary} onPress={() => handleSelectProfessional(item.id)}>
              <Text semibold color={selectedProfessional === item.id ? colors.white : colors.grey400}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />

        <FlatList
          data={services}
          display={selectedProfessional ? 'flex' : 'none'}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => <Box w={2} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable px={3} py={2} rounded="10px" bg={selectedService === item.id ? colors.primary : colors.secondary} onPress={() => handleSelectService(item.id, item.duration)}>
              <Text semibold color={selectedService === item.id ? colors.white : colors.grey400}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />

        <FlatList
          data={AvaliableTimes}
          display={selectedService ? 'flex' : 'none'}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => <Box w={2} />}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
                <Pressable px={3}py={2}rounded="10px"bg={hours === item ? colors.primary : colors.secondary} onPress={() => {setHours(item) }}>
                 <Text semibold color={hours === item ? colors.white : colors.grey400}>
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />
        <Box mx={5}>
          <Button title='Realizar agendamento' onPress={createSchedule} bg={colors.primary} />
        </Box>
      </VStack>
    </Box>
  )
}

export default Index;