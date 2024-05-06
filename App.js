import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import ProductDes from './component/ProductDes';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDescription" component={ProductDes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}