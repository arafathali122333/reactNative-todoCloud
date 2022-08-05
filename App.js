import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import Home from './screens/home';
import Login from './screens/login';

const Stack = createNativeStackNavigator();

export default function App() {
 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen 
          name='Home' 
          component={Home} 
        />
        <Stack.Screen 
          name='Login'
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}