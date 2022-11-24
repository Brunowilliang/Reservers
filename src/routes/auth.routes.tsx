import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Group, Screen } = createStackNavigator() as any;

export function AuthRoutes(){
  return (
    <Navigator initialRouteName={"login"} screenOptions={{ headerShown: false }}>
      <Screen name="login" getComponent={() => require("@screens/auth/login").default} />
      <Screen name="register" getComponent={() => require("@screens/auth/register").default} />
    </Navigator>
  );
}

