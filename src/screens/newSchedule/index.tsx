import React, { useEffect, useState } from 'react';
import { Box, FlatList, ScrollView, Spacer } from 'native-base';
import { colors } from '@styles/theme';
import HeaderModal from '@components/headerModal';
import 'moment/locale/pt-br';
import moment from 'moment';
import Calendar from '@components/calendarSplit';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '@services/supabase';
import { Profiles, Professionals, Services, Schedules, HoursAvailable } from '@services/types';
import Button from '@components/button';
import Pressable from '@components/pressable';
import Text from '@components/text';
import { StringOrNumberOrList } from 'victory-core';
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

  const availableServices: any = {
    'Cabelo': 30,
    'Barba': 10
  }

  const getSchedules = async () => {
    const { data, error } = await supabase
    .from<Schedules>('schedules')
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
    data && setProfessionals(data)
  }

  const getServices = async (id: string) => {
    const { data, error } = await supabase
    .from<Services>('services')
    .select('*')
    .eq('professional_id', id)
    error && console.log(error)
    data && setServices(data)
  }

  const registerScheduling = async () => {
    const { data, error } = await supabase
    .from<Schedules>('schedules')
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


  const getHours = (id: string, name: string) => {
    const start = moment('08:00', 'HH:mm');
    const lunchStart = moment('12:00', 'HH:mm');
    const lunchEnd = moment('14:00', 'HH:mm');
    const end = moment('18:00', 'HH:mm');

    const service = services.find((item) => item.id === id);

    const filteredScheduleProfessional = schedule.filter((schedule) => schedule.day === selectedDate.format('DD/MM/YYYY') && schedule.professional_id === selectedProfessional )
    
    const hours = [];

    let scheduledCount = -1;
    let workDuration = 0;
  
    while (start.isBefore(lunchStart)) {
      const hour = start.format('HH:mm');

      if (scheduledCount > 0) {
        hours.push({ hour, isAvailable: false })
        scheduledCount--;
      } else {
        const isAvailable = !filteredScheduleProfessional.find((schedule) => {
          if (schedule.professional_id === selectedProfessional && schedule.hour === hour) {
            workDuration = schedule.services?.duration;
            return true
          }
        });

        if (!isAvailable) {
          scheduledCount = workDuration / 10;

          hours.push({ hour,  isAvailable: false })
          scheduledCount--;
        } else {
          hours.push({ hour, isAvailable });
        }
      }

      start.add(10, 'minutes');
    }

    // while (start.isBefore(lunchStart)) {
    //   const hour = start.format('HH:mm');
    //   const isAvailable = !filteredScheduleProfessional.find((schedule) => schedule.professional_id === selectedProfessional && schedule.hour === hour);

    //   hours.push({ hour, isAvailable });
    //   start.add(10, 'minutes');
    // }



    while (lunchEnd.isBefore(end)) {
      const hour = lunchEnd.format('HH:mm');
      const isAvailable = !filteredScheduleProfessional.find((schedule) => schedule.professional_id === selectedProfessional && schedule.hour === hour);
      hours.push({ hour, isAvailable });
      lunchEnd.add(10, 'minutes');
    }

    // console.log(JSON.stringify(hours, null, 2))


    setHours(hours);

    let myHours = hours;
    // const gapTime = availableServices[name]

    const availableHours = hours.filter(hour => hour.isAvailable);
    // const newHours = schedule.map(schedule =>)

    // setHours(availableHours);

    // console.log('name', name)
    // console.log('available', )

    // if (service) {
    //   for (let i = 0; i < schedule.length; i++) {
    //     const scheduleMoment = moment(schedule[i].hour, 'HH:mm');
    //     const serviceMoment = moment(schedule[i].hour, 'HH:mm').add(service.duration, 'minutes');
    //     const serviceBefore = moment(schedule[i].hour, 'HH:mm').subtract(service.duration, 'minutes');
        
    //     console.log(serviceBefore.toLocaleString())
    //     console.log(scheduleMoment.toLocaleString())
    //     console.log(serviceMoment.toLocaleString())
  
    //     const filteredHours = hours.filter((hour) => {
    //       const hourMoment = moment(hour.hour, 'HH:mm');

    //       console.log('currentHour', hourMoment.toLocaleString())
    //       console.log('comp', hourMoment.isBetween(scheduleMoment, serviceMoment))
    //       return !(hourMoment.isBetween(scheduleMoment, serviceMoment) || hourMoment.isBetween(serviceBefore, scheduleMoment));
    //     });
  
    //   myHours = filteredHours;
    //   // console.log(filteredHours);
  
    //   setHours(myHours);
    //   }
    // }

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

  const handleSelectService = (id: string, name: string) => {
    if (selectedService === id) {
      getSchedules();
      setSelectedService(null);
      setHours([]);
    } else {
      setSelectedService(id);
      getHours(id, name);
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
                <Pressable px={3} py={2} rounded="10px" bg={selectedService === item.id ? colors.primary : colors.secondary} onPress={() => handleSelectService(item.id, item.name)}>
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