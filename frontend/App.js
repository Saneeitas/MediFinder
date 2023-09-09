import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SecondTabScreen from './app/screens/NearbyHospitalScreen';
import ThirdTabScreen from './app/screens/ThirdTabScreen';
import HospitalDetail from "./app/screens/HospitalDetail"
import HomeScreen from "./app/components/HomeScreen"
import { Ionicons } from '@expo/vector-icons';
import colors from './app/config/colors';

const Stack = createStackNavigator();

export default function App() {
  
  return (
     <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Stack.Screen name="Nearby Hospital" options={{ headerShown: true }} component={SecondTabScreen} />
      <Stack.Screen name="Hospital Information" options={{ headerShown: true }} component={HospitalDetail} />
    </Stack.Navigator>
      </NavigationContainer>
  );
}
