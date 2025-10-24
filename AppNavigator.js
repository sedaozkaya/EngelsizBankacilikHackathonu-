import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import IslemlerMenuScreen from './IslemlerMenuScreen';
import OdemelerScreen from './OdemelerScreen';
import BasvurularScreen from './BasvurularScreen';
import YatirimHesabiScreen from './YatirimHesabiScreen';
import SendMoneyScreen from './SendMoneyScreen';
import YouTubeModal from './YouTubeModal';

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
        <Stack.Screen name="Basvurular" component={BasvurularScreen} />
  <Stack.Screen name="YatirimHesabi" component={YatirimHesabiScreen} />
  <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
  <Stack.Screen name="YouTubeModal" component={YouTubeModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
