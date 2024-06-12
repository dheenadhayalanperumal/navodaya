import React, { PureComponent, useEffect, useRef } from "react";
import { Image, Alert, BackHandler, StatusBar } from "react-native";
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
import Green from "./component/Green";
import CustomerGreen from "./component/CustomerGreen";
import CustomerList from "./component/CustomerList";
import CustomerData from "./component/CustomerData";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

class HomeTabs extends PureComponent {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#A20A3A" translucent={true} />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? require("./Image/home1.png") : require("./Image/home.png");
              } else if (route.name === "History") {
                iconName = focused ? require("./Image/history1.png") : require("./Image/history.png");
              } else if (route.name === "AddCustomer") {
                iconName = focused ? require("./Image/Customer1.png") : require("./Image/Customer.png");
              } else if (route.name === "View") {
                iconName = focused ? require("./Image/view1.png") : require("./Image/view.png");
              }
              return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
            },
            tabBarActiveTintColor: "#A20A3A",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { display: "flex" },
          })}
        >
          <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Tab.Screen name="History" component={History} options={{ headerShown: false }} />
          <Tab.Screen name="AddCustomer" component={AddCustomer} options={{ headerShown: false }} />
          <Tab.Screen name="View" component={CustomerList} options={{ headerShown: false }} />
        </Tab.Navigator>
      </>
    );
  }
}

export default function App() {
  const navigationRef = useRef(null);

  useEffect(() => {
    const backAction = () => {
      const state = navigationRef.current.getRootState();
      const currentRoute = state.routes[state.index];

      if (currentRoute.name === "Home1" && currentRoute.state) {
        // Checking if we're at the top level of the tab navigator
        const tabIndex = currentRoute.state.index;
        if (tabIndex === 0) {
          Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
        } else {
          navigationRef.current.goBack();
        }
      } else {
        navigationRef.current.goBack();
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#A20A3A" },
          headerTintColor: "#FFFFFF",
        }}
      >
        <Stack.Screen name="IsloggedIn" component={CheckUserLoggedIn} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home1" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AmountCollect" component={ProductDes} />
        <Stack.Screen name="Password" component={Password} options={{ headerRight: () => <LogoutButton /> }} />
        <Stack.Screen name="Collection" component={Collection} />
        <Stack.Screen name="AddCustomer1" component={AddCustomer1} />
        <Stack.Screen name="ShopAddress" component={ShopAddress} />
        <Stack.Screen name="OtherDocuments" component={AddDocument} />
        <Stack.Screen name="Green" component={Green} />
        <Stack.Screen name="Succuss" component={CustomerGreen} />
        <Stack.Screen name="CustomerData" component={CustomerData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
