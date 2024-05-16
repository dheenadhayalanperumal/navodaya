import React, { PureComponent } from "react";
import { Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import ProductDes from "./component/ProductDes";
import History from "./component/History";
import Password from "./component/Password";
import Collection from "./component/Collection";
import AddCustomer from "./component/AddCustomer";
import AddCustomer1 from "./component/AddCustomer1";
import ShopAddress from "./component/ShopAddress";
import AddDocument from "./component/AddDocument";
import CheckUserLoggedIn from "./component/CheckUserLoggedIn";
import LogoutButton from "./component/LogoutButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

class HomeTabs extends PureComponent {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? require("./Image/home.png")
                : require("./Image/homeActive.png");
            } else if (route.name === "History") {
              iconName = focused
                ? require("./Image/history.png")
                : require("./Image/historyActive.png");
            } else if (route.name === "AddCustomer") {
              iconName = focused
                ? require("./Image/Customer.png")
                : require("./Image/Customer.png");
            }

            // You can return any component that you like here!
            return (
              <Image
                source={iconName}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          },
          tabBarActiveTintColor: "#A20A3A",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { display: "flex" },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="AddCustomer"
          component={AddCustomer}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => <LogoutButton />,
          headerStyle: { backgroundColor: "#A20A3A" },
          headerTintColor: "#FFFFFF",
        }}
      >
        <Stack.Screen
          name="IsloggedIn"
          component={CheckUserLoggedIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Home1"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductDescription" component={ProductDes} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Collection" component={Collection} />
        <Stack.Screen name="AddCustomer1" component={AddCustomer1} />
        <Stack.Screen name="ShopAddress" component={ShopAddress} />
        <Stack.Screen name="OtherDocuments" component={AddDocument} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
