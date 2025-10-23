import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import IslemlerMenuScreen from './IslemlerMenuScreen';
import OdemelerScreen from './OdemelerScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="IslemlerMenu" component={IslemlerMenuScreen} />
        <Stack.Screen name="Odemeler" component={OdemelerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
