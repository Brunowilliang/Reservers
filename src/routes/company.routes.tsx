import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import { colors, fonts } from '@styles/theme';
import { ListChecks, ChartPieSlice, MagnifyingGlass, Calendar, User, Gear } from 'phosphor-react-native';
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
    <Tabs.Navigator initialRouteName="agenda" appearance={tabAppearance} tabBarOptions={tabBarOptions}>
        <Tabs.Screen name="schedule" getComponent={() => require("@screens/company/companySchedule").default}
          options={{
            tabBarLabel: 'Agenda',
            tabBarIcon: ({ color }: any) => ( <MagnifyingGlass size={25} weight="bold" color={color} /> ),
          }}
        />
        
        <Tabs.Screen name="settings" getComponent={() => require("@screens/company/companySettings").default}
          options={{
            tabBarLabel: "Config",
            tabBarIcon: ({ color }: any) => ( <Gear size={25} weight="bold" color={color} /> ),
          }}
        />
      </Tabs.Navigator>
  )
}

export function CompanyRoutes(){
  const { user } = useAuth();
  return ( 
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeTabs" component={HomeTabs} />
      <Screen name="home" component={HomeTabs} />
      <Screen name="companyProfile" getComponent={() => require("@screens/company/companyProfile").default } />
      <Screen name="userProfile" getComponent={() => require("@screens/user/userProfile").default } />
      <Screen name="companySettingsHours" getComponent={() => require("@screens/company/companySettingsHours").default } />
      <Screen name="companyProfessionals" getComponent={() => require("@screens/company/companyProfessionals").default } />
    </Navigator>
  );
}

