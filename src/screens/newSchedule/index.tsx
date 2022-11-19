import React, { useEffect, useState } from 'react';
import { Box, FlatList, ScrollView } from 'native-base';
import { colors } from '@styles/theme';
import 'moment/locale/pt-br';
import moment from 'moment';
import Calendar from '@components/calendarSplit';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '@services/supabase';
import { Professionals, Services, Schedules, HoursAvailable } from '@services/types';
import Button from '@components/button';
import Pressable from '@components/pressable';
import Text from '@components/text';
import { RefreshControl } from 'react-native';
import Toast from '@components/toast';
import Header from '@components/header';

const Index = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params as any;

  const [selectedDate, setSelectedDate] = useState(moment());

  const [hours, setHours] = useState([] as any);
  const [selectedHour, setSelectedHour] = useState(null as any);

  const [schedule, setSchedule] = useState<Schedules[]>([] as Schedules[]);

  const [professionals, setProfessionals] = useState<Professionals[]>([] as Professionals[]);
  const [selectedProfessional, setSelectedProfessional] = useState(null as any);

  const [services, setServices] = useState<Services[]>([]);
  const [selectedService, setSelectedService] = useState(null as any);

  const getSchedules = async () => {
    const { data, error } = await supabase
    .from('schedules')
    .select(`*, profiles:profile_id(*), professionals:professional_id(*), services:service_id(*), users:user_id(*)`)
    error && console.log(error)
    data && (setSchedule(data as any));
  }

  const getProfessionals = async () => {
    const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('profile_id', item.id)
    error && console.log(error)
    data && setProfessionals(data as any);
  }

  const getServices = async (id: string) => {
    const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('professional_id', id)
    error && console.log(error)
    data && setServices(data as any);
  }

  const registerScheduling = async () => {
    const { data, error } = await supabase
    .from('schedules')
    .insert({
      day: selectedDate.format('DD/MM/YYYY'),
      hour: selectedHour,
      professional_id: selectedProfessional,
      service_id: selectedService,
      profile_id: item.id,
      user_id: item.id,
    })
    error && (
      Toast({ titulo: 'Erro', descricao: 'Não foi possível agendar o serviço', type: 'danger' }),
      console.log(error)
    )
    data && (
      // Toast({ titulo: 'Sucesso', descricao: 'Agendamento realizado com sucesso', type: 'success' }),
      navigation.navigate('scheduleCompleted')
    )
  }


  const getHours = (id: string) => {
    let start = moment('08:00', 'HH:mm');
    let lunchStart = moment('12:00', 'HH:mm');
    let lunchEnd = moment('14:00', 'HH:mm');
    let end = moment('18:00', 'HH:mm');

    const service = services.find((item) => item.id === id);

    const filteredScheduleByProfessional = schedule.filter((schedule) => schedule.day === selectedDate.format('DD/MM/YYYY') && schedule.professional_id === selectedProfessional )
    
    const unavailableHours: any[] = [];
    const availableHours: any[] = [];

    // const INTERVAL = service?.duration;
    const INTERVAL = 10;
    let workDuration = 0;
  
    while (start.isBefore(lunchStart)) {
      const hour = start.format('HH:mm');

      const isAvailable = !filteredScheduleByProfessional.find((schedule) => {
        if (schedule.hour === hour) {
          workDuration = schedule.services?.duration;
          return true
        }
      });

      if (!isAvailable) {
          unavailableHours.push({ hour, duration: workDuration})
          start.add(workDuration, 'minutes');
        } else {
          availableHours.push(hour);
          start.add(INTERVAL, 'minutes')
        }
    }

    // while (lunchEnd.isBefore(end)) {
    //   const hour = lunchEnd.format('HH:mm');
    //   const isAvailable = !filteredScheduleByProfessional.find((schedule) => schedule.professional_id === selectedProfessional && schedule.hour === hour);
    //   hours.push({ hour, isAvailable });
    //   lunchEnd.add(10, 'minutes');
    // }


    // ex: cabelo 30 minutos
    // 08:00 - 08:10 - 08:20 - 08:30 - (09:00) - 09:30

    // ex: barba 20 minutos
    // 08:00 - 08:10 - 08:20 - 08:30 - 08-40 - (09:00 - cabelo) - 09:30

    // ex: cabelo e barba 60 minutos
    // 08:00 - 08:10 - 08:20 - 08:30 - 08-00 - (09:00 - cabelo e barba) - 10:00 - 10:10 - 10:20 - 10:30 - 10:40


    const newHours = [];
    let aux = 0;

    start = moment('08:00', 'HH:mm');
    lunchStart = moment('12:00', 'HH:mm');
    lunchEnd = moment('14:00', 'HH:mm');
    end = moment('18:00', 'HH:mm');

    while(start.isBefore(lunchStart)) {
      const hour = start.format('HH:mm');
      const nextScheduleHour = moment(start, 'HH:mm').add(INTERVAL, 'minutes')

      unavailableHours.forEach(el => {
        const currentTime = moment(el.hour, 'HH:mm')
        const serviceTime = service?.duration > el.duration ? service?.duration : el.duration

        const nextScheduleWorking = moment(hour, 'HH:mm').add(
          el.duration,
          'minutes'
        );

        const minutesToAdd = currentTime.subtract(start.minutes(), 'minutes').minutes();

        if (currentTime.isBetween(start, nextScheduleWorking)) {
          newHours.push({ hour, isAvailable: true });
          start.add(minutesToAdd + serviceTime, 'minutes');
          aux = 1;
        }
        else if(currentTime.isBetween(start, nextScheduleHour)) {
          newHours.push({ hour, isAvailable: true})
          start.add(serviceTime + minutesToAdd, 'minutes');
          aux = 1;
        }
      });

      if (aux === 0) {
        newHours.push({ hour, isAvailable: true})
        start.add(INTERVAL, 'minutes');
      } else {
        aux = 0;
      }

      let finalHours: any[] = [];

      newHours.forEach(hour => {
        if (availableHours.includes(hour.hour)) {
          finalHours.push(hour);
        }
      })

      console.log(unavailableHours)

      setHours(finalHours)

    }

  }


  const morningHours = hours.filter((hour: HoursAvailable) => moment(hour.hour, 'HH:mm').isBefore(moment('12:00', 'HH:mm'))).filter((hour: HoursAvailable) => hour.isAvailable);
  const afternoonHours = hours.filter((hour: HoursAvailable) => moment(hour.hour, 'HH:mm').isBetween(moment('12:01', 'HH:mm'), moment('17:59', 'HH:mm'))).filter((hour: HoursAvailable) => hour.isAvailable);
  const nightHours = hours.filter((hour: HoursAvailable) => moment(hour.hour, 'HH:mm').isAfter(moment('17:59', 'HH:mm'))).filter((hour: HoursAvailable) => hour.isAvailable);


  const handleSelectDate = (date: any) => {
    setSelectedDate(date);
    getProfessionals();
    setServices([]);
    setHours([]);
    setSelectedProfessional(null);
    setSelectedService(null);
    setSelectedHour(null);
  };

  const handleSelectProfessional = (id: string) => {
    if (selectedProfessional === id) {
      setSelectedProfessional(null);
      setServices([]);
      setHours([]);
    } else {
      setSelectedProfessional(id);
      getServices(id);
      setSelectedService(null);
      setSelectedHour(null);
      setHours([]);
    }
  };

  const handleSelectService = (id: string) => {
    if (selectedService === id) {
      getSchedules();
      setSelectedService(null);
      setHours([]);
    } else {
      setSelectedService(id);
      getHours(id);
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
    setServices([]);
    setHours([]);
  }


  useEffect(() => {
    getSchedules();
  }, [ selectedDate, hours ]);



  return (
    <Box safeAreaBottom pb={5} flex={1} bg={colors.background}>
      <Header px={5} title='Novo agendamento,' subtitle={item.name} back />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, paddingTop: 20}} refreshControl={<RefreshControl refreshing={false} onRefresh={refresh}/>}>
        <Calendar
          style={{ height: 130 }}
          startingDate={selectedDate}
          selectedDate={selectedDate}
          onDateSelected={
            (date: any) => handleSelectDate(date)
          }
        />

        {/* <List
          data={professionals}
          title="Selecionar profissional"
          keyExtractor={(item: any) => item.id}
          isActive={(item: any) => item.id === selectedProfessional}
          onPress={(item: any) => handleSelectProfessional(item.id)}
          name={(item: any) => item.name}
        /> */}

        {professionals.length > 0 && (
          <>
            <Text h3 bold mt={5} px={5} mb={2}>Selecionar profissional</Text>
              <FlatList
                data={professionals}
                horizontal
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
          </>
        )}

        {services?.length > 0 && (
          <>
            <Text h3 bold mt={5} px={5} mb={2}>Selecionar serviço</Text>
            <FlatList
              data={services}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              ItemSeparatorComponent={() => <Box w={2} />}
              renderItem={({ item }) => (
                <Pressable px={3} py={2} rounded="10px" bg={selectedService === item.id ? colors.primary : colors.secondary} onPress={() => handleSelectService(item.id)}>
                  <Text semibold color={selectedService === item.id ? colors.white : colors.grey400}>{item.name}</Text>
                </Pressable>
              )}
            />
          </>
        )}


        {hours.length > 0 && (
          <>
           <Text h3 bold mt={5} px={5} mb={2}>Selecionar horário</Text>
           {morningHours.length > 0 && (
            <Text h5 bold px={5} mb={1}>Manhã</Text>
           )}
            <FlatList
              data={morningHours}
              keyExtractor={(item: any) => item.hour}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, marginBottom: morningHours.length > 0 ? 10 : 0 }}
              ItemSeparatorComponent={() => <Box w={2} />}
              renderItem={({ item }: any) => (
                <Pressable px={3} py={2} rounded="10px" bg={selectedHour === item.hour ? colors.primary : colors.secondary} onPress={() => handleSelectHour(item.hour)}>
                  <Text semibold color={selectedHour === item.hour ? colors.white : colors.grey400}>{item.hour}</Text>
                </Pressable>
              )}
            />
            {afternoonHours.length > 0 && (
              <Text h5 bold px={5} mb={1}>Tarde</Text>
            )}
            <FlatList
              data={afternoonHours}
              keyExtractor={(item: any) => item.hour}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, marginBottom: morningHours.length > 0 ? 10 : 0 }}
              ItemSeparatorComponent={() => <Box w={2} />}
              renderItem={({ item }: any) => (
                <Pressable px={3} py={2} rounded="10px" bg={selectedHour === item.hour ? colors.primary : colors.secondary} onPress={() => handleSelectHour(item.hour)}>
                  <Text semibold color={selectedHour === item.hour ? colors.white : colors.grey400}>{item.hour}</Text>
                </Pressable>
              )}
            />
            {nightHours.length > 0 && (
              <Text h5 bold px={5} mb={1}>Noite</Text>
            )}
            <FlatList
              data={nightHours}
              keyExtractor={(item: any) => item.hour}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, marginBottom: morningHours.length > 0 ? 10 : 0 }}
              ItemSeparatorComponent={() => <Box w={2} />}
              renderItem={({ item }: any) => (
                <Pressable px={3} py={2} rounded="10px" bg={selectedHour === item.hour ? colors.primary : colors.secondary} onPress={() => handleSelectHour(item.hour)}>
                  <Text semibold color={selectedHour === item.hour ? colors.white : colors.grey400}>{item.hour}</Text>
                </Pressable>
              )}
            />
          </>
        )}
        {/* <Text h4 bold color={colors.grey600} p={5}>Ops... nenhum horário disponível</Text> */}
      </ScrollView>
      <Box px={5}>
        <Button title="Realizar agendamento"
          onPress={registerScheduling} />
      </Box>
    </Box>
  )
}

export default Index;