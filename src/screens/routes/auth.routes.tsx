import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Group, Screen } = createStackNavigator() as any;

export function AuthRoutes(){
  return (
    <Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false, presentation: "transparentModal", gestureEnabled: false}}>
      <Screen name="Home" getComponent={() => require("@screens/descobrir").default} />
    </Navigator>
  );
}

