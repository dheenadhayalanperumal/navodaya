import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import ProductDes from './component/ProductDes';
import History from './component/History';
import { Image } from 'react-native'; // import the Image component
import Password from './component/Password';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./Image/home.png')
              : require('./Image/homeActive.png');
          } else if (route.name === 'History') {
            iconName = focused
              ? require('./Image/history.png')
              : require('./Image/historyActive.png');
          }

          // You can return any component that you like here!
          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#A20A3A',
        inactiveTintColor: 'gray',
      }} >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="History" component={History}  options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#A20A3A', // Set your header color here
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home1" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDescription" component={ProductDes} />
        <Stack.Screen name="Password" component={Password} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}