import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Group, Screen } = createStackNavigator() as any;

export function AuthRoutes(){
  return (
    <Navigator initialRouteName={"login"} screenOptions={{ headerShown: false }}>
      <Screen name="login" getComponent={() => require("@screens/login").default} />
      <Screen name="register" getComponent={() => require("@screens/register").default} />
    </Navigator>
  );
}

