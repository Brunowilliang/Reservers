import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import { colors, fonts } from '@styles/theme';
import { ListChecks, ChartPieSlice, MagnifyingGlass, Calendar } from 'phosphor-react-native';

const Tabs = AnimatedTabBarNavigator() as any;
const Stack = createStackNavigator() as any;

const tabAppearance: any = {
  horizontalPadding: 20,
  shadow: false,
  whenActiveShow: 'both',
  whenInactiveShow: "icon-only",
  dotSize: "small",
  floating: false,
  dotCornerRadius: 14,
  tabBarBackground: colors.secondary,
  activeTabBackgrounds: colors.transparent,
};

const tabBarOptions: any = {
  activeTintColor: colors.primary,
  inactiveTintColor: colors.grey600,
  labelStyle: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
};

function HomeTabs() {
  return (
    <Tabs.Navigator initialRouteName="search" appearance={tabAppearance} tabBarOptions={tabBarOptions}>

        <Tabs.Screen name="search" getComponent={() => require("@screens/search").default}
          options={{
            tabBarLabel: "Descobrir",
            tabBarIcon: ({ color }: any) => ( <MagnifyingGlass size={25} weight="bold" color={color} /> ),
          }}
        />
        
        <Tabs.Screen name="mySchedules" getComponent={() => require("@screens/mySchedules").default}
          options={{
            tabBarLabel: "Meus Agendamentos",
            tabBarIcon: ({ color }: any) => ( <Calendar size={25} weight="bold" color={color} /> ),
          }}
        />

      </Tabs.Navigator>
  )
}

export function AppRoutes(){
  return ( 
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" getComponent={() => require("@screens/login").default} />
      <Stack.Screen name="register" getComponent={() => require("@screens/register").default} />
      <Stack.Screen name="home" component={HomeTabs} />
      <Stack.Screen name="newSchedule" getComponent={() => require("@screens/newSchedule").default} />
      <Stack.Screen name="scheduleCompleted" getComponent={() => require("@screens/scheduleCompleted").default} />
    </Stack.Navigator>
  );
}

