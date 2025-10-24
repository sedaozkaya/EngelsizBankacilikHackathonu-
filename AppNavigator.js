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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ accessibilityLabel: 'Giriş ekranı' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ accessibilityLabel: 'Ana sayfa ekranı' }}
        />
        <Stack.Screen
          name="IslemlerMenu"
          component={IslemlerMenuScreen}
          options={{ accessibilityLabel: 'İşlemler menüsü ekranı' }}
        />
        <Stack.Screen
          name="Odemeler"
          component={OdemelerScreen}
          options={{ accessibilityLabel: 'Ödemeler ekranı' }}
        />
        <Stack.Screen
          name="Basvurular"
          component={BasvurularScreen}
          options={{ accessibilityLabel: 'Başvurular ekranı' }}
        />
        <Stack.Screen
          name="YatirimHesabi"
          component={YatirimHesabiScreen}
          options={{ accessibilityLabel: 'Yatırım hesabı ekranı' }}
        />
        <Stack.Screen
          name="SendMoney"
          component={SendMoneyScreen}
          options={{ accessibilityLabel: 'Para gönderme ekranı' }}
        />
        <Stack.Screen
          name="YouTubeModal"
          component={YouTubeModal}
          options={{ accessibilityLabel: 'YouTube video ekranı' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
