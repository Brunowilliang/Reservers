import React from 'react';
import { colors, fonts } from '@styles/theme';
import moment from 'moment';
import { Box } from 'native-base';
import Pressable from './pressable';
import Text from './text';
import CalendarStrip, { CalendarStripProps, IDayComponentProps } from 'react-native-calendar-strip';
import Toast from './toast';

type Props = CalendarStripProps & {}

const renderDayComponent = ({ date, selected, onDateSelected }: IDayComponentProps ) => {
  const disabled = date <= moment().subtract(1, 'days');
  
  return (
    <Box flex={1} ml="30px" h="100px" alignItems="center" justifyContent="center" bg={colors.background}>
      <Pressable
        onPress={() => {
          if (disabled) {
            Toast({ titulo: 'Erro', descricao: 'Não é possível selecionar uma data passada', type: 'warning' }); 
            onDateSelected(moment());
          } else {
            onDateSelected(date);
          }
        } }
        alignItems="center" justifyContent="center" w="70px" h="80px" rounded="10px" bg={selected ? colors.primary : colors.secondary}>
        <Text textAlign="center" h1 semibold color={ selected ? colors.white : disabled ? colors.grey400 : colors.grey400 }>
            {date.format('DD')}
          </Text>
        <Text textAlign="center" h5 medium textTransform="uppercase" color={ selected ? colors.white : disabled ? colors.grey400 : colors.grey400 }>
            {date.format('ddd')}
        </Text>
      </Pressable>
    </Box>
  );
}

const Calendar = (props :Props) => {
  return (
    <>
      {/* @ts-ignore */}
      <CalendarStrip
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
        maxDate={moment().add(3, 'months').date(0)}
        minDate={moment()}
        scrollable
        numDaysInWeek={4}
        calendarHeaderStyle={{ color: colors.white, fontFamily: fonts.bold, fontSize: 18, textAlign: 'left', width: '100%', paddingHorizontal: 20, textTransform: 'capitalize' }}
        calendarHeaderFormat={'MMMM, YYYY'}
        dayComponentHeight={100}
        maxDayComponentSize={80}
        minDayComponentSize={80}
        responsiveSizingOffset={0}
        iconStyle={{ display: 'none' }}
        dayComponent={renderDayComponent}
        {...props}
      />
    </>
  )
}

export default Calendar;