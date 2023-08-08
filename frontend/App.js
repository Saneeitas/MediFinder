import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstTabScreen from './app/screens/FirstTabScreen';
import SecondTabScreen from './app/screens/SecondTabScreen';
import ThirdTabScreen from './app/screens/ThirdTabScreen';
import HospitalDetail from "./app/screens/HospitalDetail"
import { Ionicons } from '@expo/vector-icons';
import colors from './app/config/colors';

const Stack = createStackNavigator();

function SecondTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Second Screen" options={{ headerShown: false }} component={SecondTabScreen} />
      <Stack.Screen name="Details" options={{ headerShown: false }} component={HospitalDetail} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
     <NavigationContainer>
      <Tab.Navigator
        screenOptions={ ({ route }) => ({
          tabBarActiveTintColor: colors.secondary, // Change the active icon color to green
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: colors.primary },
           tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Hospitals') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Navigate') {
            iconName = focused ? 'location' : 'location-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
          },
          
        })
      
         
          
        }
  
        
      >
        <Tab.Screen name="Home" component={ FirstTabScreen }
          options={ {
            title: 'Home',
            headerStyle: {
              backgroundColor: colors.secondary,
              //backgroundColor: colors.primary,
            },
            headerTintColor: colors.primary,
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
             headerLeft: () => (
              <Ionicons
                name="md-menu"
                size={24}
                 color={ colors.primary }
                style={{ marginLeft: 10 }}
               />
      ),
        }} />
        <Tab.Screen name="Hospitals" component={ SecondTabStack }
          options={ {
            title: 'Hospitals',
            headerStyle: {
              backgroundColor: colors.secondary,
            },
            headerTintColor: colors.primary,
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            
        }}
        />
        <Tab.Screen name="Navigate" component={ ThirdTabScreen }
          options={ {
            title: 'Navigate',
            headerStyle: {
              backgroundColor: colors.secondary,
            },
            headerTintColor: colors.primary,
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
        }}
        />
      </Tab.Navigator>
      </NavigationContainer>
  );
}
