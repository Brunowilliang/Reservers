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
import { useAxios } from '@services/axios';
import { User, Schedules, Services, Professionals } from '@utils/types';
import { api } from '@services/pocketbase';

const Index = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params as { item: User };

  const [selectedDate, setSelectedDate] = useState(moment());

  const [hours, setHours] = useState([] as any);
  const [selectedHour, setSelectedHour] = useState(null as any);
  
  const [selectedProfessional, setSelectedProfessional] = useState(null as any);
  const [selectedService, setSelectedService] = useState(null as any);


  const [{ data: schedule, loading: scheduleLoading, error: scheduleError }, scheduleRefetch ] = useAxios<Schedules>({
    url: `/schedules/records?filter=day='${selectedDate.format('DD/MM/YYYY')}'&&expand=service`,
    method: 'GET',
  });
  if (scheduleError) Toast({ titulo: 'Ops!', descricao: 'Nenhum agendamento encontrado', type: 'warning' });


  const [{ data: professionals, loading: professionalsLoading, error: professionalsError }, professionalsRefetch ] = useAxios<Professionals>({
    url: `/professionals/records/?expand=company&&filter=company='${item.id}'`,
    method: 'GET',
  })
  if (professionalsError) Toast({ titulo: 'Ops!', descricao: 'Nenhum profissional encontrado', type: 'warning' });


  const [{ data: services, loading: servicesLoading, error: servicesError }, servicesRefetch ] = useAxios<Services>({
    url: `/services/records/?filter=professional.company.id='${item.id}'&&expand=professional.company`,
    method: 'GET',
  })
  if (servicesError) Toast({ titulo: 'Ops!', descricao: 'Nenhum serviço encontrado', type: 'warning' });


  const createSchedule = async () => {
    await api.collection('schedules').create({
      "provider": item.id,
      "user": item.id,
      "professional": selectedProfessional,
      "service": selectedService,
      "day": selectedDate.format('DD/MM/YYYY'),
      "hour": "00:00",
    }).then((response) => {
      navigation.navigate('scheduleCompleted');
    }).catch((error) => {
      Toast({ titulo: 'Ops!', descricao: 'Erro ao criar agendamento', type: 'warning' });
      console.log(error);
    });
  }


  // const getHours = (id: string) => {
  //   let start = moment('08:00', 'HH:mm');
  //   let lunchStart = moment('12:00', 'HH:mm');
  //   let lunchEnd = moment('14:00', 'HH:mm');
  //   let end = moment('18:00', 'HH:mm');

  //   const service = services?.items.find((service: any) => service.id === id);

  //   const filteredScheduleByProfessional = schedule?.items.filter((schedule: Schedules) => schedule?.items?.day === selectedDate.format('DD/MM/YYYY') && schedule?.items.ex.professional_id === selectedProfessional )
    
  //   const unavailableHours: any[] = [];
  //   const availableHours: any[] = [];

  //   // const INTERVAL = service?.duration;
  //   const INTERVAL = 10;
  //   let workDuration = 0;
  
  //   while (start.isBefore(lunchStart)) {
  //     const hour = start.format('HH:mm');

  //     const isAvailable = !filteredScheduleByProfessional.find((schedule: Schedules) => {
  //       if (schedule.hour === hour) {
  //         workDuration = schedule.services?.duration;
  //         return true
  //       }
  //     });

  //     if (!isAvailable) {
  //         unavailableHours.push({ hour, duration: workDuration})
  //         start.add(workDuration, 'minutes');
  //       } else {
  //         availableHours.push(hour);
  //         start.add(INTERVAL, 'minutes')
  //       }
  //   }

  //   // while (lunchEnd.isBefore(end)) {
  //   //   const hour = lunchEnd.format('HH:mm');
  //   //   const isAvailable = !filteredScheduleByProfessional.find((schedule) => schedule.professional_id === selectedProfessional && schedule.hour === hour);
  //   //   hours.push({ hour, isAvailable });
  //   //   lunchEnd.add(10, 'minutes');
  //   // }


  //   // ex: cabelo 30 minutos
  //   // 08:00 - 08:30 - (09:00 - cabelo) - 09:30 - 10:00

  //   // ex: barba 20 minutos
  //   // 08:00 - 08:20 - 08:40 - (09:00 - cabelo) - 09:30 - 09:50

  //   // ex: cabelo e barba 60 minutos
  //   // 08:00 - 08:10 - 08:20 - 08:30 - 08-00 - (09:00 - cabelo e barba) - 10:00 - 10:10 - 10:20 - 10:30 - 10:40


  //   const newHours = [];
  //   let aux = 0;

  //   start = moment('08:00', 'HH:mm');
  //   lunchStart = moment('12:00', 'HH:mm');
  //   lunchEnd = moment('14:00', 'HH:mm');
  //   end = moment('18:00', 'HH:mm');

  //   while(start.isBefore(lunchStart)) {
  //     const hour = start.format('HH:mm');
  //     const nextScheduleHour = moment(start, 'HH:mm').add(INTERVAL, 'minutes')

  //     unavailableHours.forEach(el => {
  //       const currentTime = moment(el.hour, 'HH:mm')
  //       const serviceTime = service?.duration > el.duration ? service?.duration : el.duration

  //       const nextScheduleWorking = moment(hour, 'HH:mm').add(
  //         el.duration,
  //         'minutes'
  //       );

  //       const minutesToAdd = currentTime.subtract(start.minutes(), 'minutes').minutes();

  //       if (currentTime.isBetween(start, nextScheduleWorking)) {
  //         newHours.push({ hour, isAvailable: true });
  //         start.add(minutesToAdd + serviceTime, 'minutes');
  //         aux = 1;
  //       }
  //       else if(currentTime.isBetween(start, nextScheduleHour)) {
  //         newHours.push({ hour, isAvailable: true})
  //         start.add(serviceTime + minutesToAdd, 'minutes');
  //         aux = 1;
  //       }
  //     });

  //     if (aux === 0) {
  //       newHours.push({ hour, isAvailable: true})
  //       start.add(INTERVAL, 'minutes');
  //     } else {
  //       aux = 0;
  //     }

  //     let finalHours: any[] = [];

  //     newHours.forEach(hour => {
  //       if (availableHours.includes(hour.hour)) {
  //         finalHours.push(hour);
  //       }
  //     })

  //     console.log(unavailableHours)

  //     setHours(finalHours)

  //   }

  // }


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

  const handleSelectService = (id: string) => {
    if (selectedService === id) {
      setSelectedService(null);
      setHours([]);
    } else {
      setSelectedService(id);
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


  useEffect(() => {
    console.log(JSON.stringify(schedule, null, 2))
  }, [schedule]);



  return (
    <Box safeAreaBottom pb={5} flex={1} bg={colors.background}>
      <Header px={5} title='Novo agendamento,' subtitle={item?.company_name} back />
      <VStack space={5}>
        <Calendar
          style={{ height: 130 }}
          startingDate={selectedDate}
          selectedDate={selectedDate}
          onDateSelected={(date: any) => handleSelectDate(date)}
        />

        <FlatList
          data={professionals?.items}
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
          data={services?.items}
          display={selectedProfessional ? 'flex' : 'none'}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => <Box w={2} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable px={3} py={2} rounded="10px" bg={selectedService === item.id ? colors.primary : colors.secondary} onPress={() => handleSelectService(item.id)}>
              <Text semibold color={selectedService === item.id ? colors.white : colors.grey400}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
        <Box mx={5}>
          <Button title='Realizar agendamento' onPress={createSchedule} bg={colors.primary} />
        </Box>
      </VStack>
    </Box>
  )
}

export default Index;