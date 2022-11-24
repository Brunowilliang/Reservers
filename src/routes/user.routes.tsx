import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import { colors, fonts } from '@styles/theme';
import { ListChecks, ChartPieSlice, MagnifyingGlass, Calendar, User } from 'phosphor-react-native';
import { useAuth } from '@hooks/useAuth';

const Tabs = AnimatedTabBarNavigator() as any;
const { Navigator, Group, Screen } = createStackNavigator();


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
  const { user } = useAuth();
  return (
    <Tabs.Navigator initialRouteName="search" appearance={tabAppearance} tabBarOptions={tabBarOptions}>

        <Tabs.Screen name="userSearch" getComponent={() => require("@screens/user/userSearch").default}
          options={{
            tabBarLabel: 'Descobrir',
            tabBarIcon: ({ color }: any) => ( <MagnifyingGlass size={25} weight="bold" color={color} /> ),
          }}
        />
        
        <Tabs.Screen name="userSchedules" getComponent={() => require("@screens/user/userSchedules").default}
          options={{
            tabBarLabel: "Meus Agend.",
            tabBarIcon: ({ color }: any) => ( <Calendar size={25} weight="bold" color={color} /> ),
          }}
        />

        <Tabs.Screen name="userProfile" getComponent={() => require("@screens/user/userProfile").default}
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color }: any) => ( <User size={25} weight="bold" color={color} /> ),
          }}
        />
      </Tabs.Navigator>
  )
}

export function UserRoutes(){
  const { user } = useAuth();
  return ( 
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeTabs" component={HomeTabs} />
      <Screen name="home" component={HomeTabs} />
      <Screen name="userNewSchedule" getComponent={() => require("@screens/user/userNewSchedule").default} />
      <Screen name="userScheduleCompleted" getComponent={() => require("@screens/user/userScheduleCompleted").default} />
    </Navigator>
  );
}

