import { useEffect } from "react"; // Import useEffect
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckUserLoggedIn = ({ navigation }) => {
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check if user ID exists in AsyncStorage
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          // User ID exists, navigate to home page
          navigation.navigate("Home1");
        } else {
          // User ID does not exist, navigate to login page
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking user logged in:", error);
        // If there's an error, navigate to login page to be safe
        navigation.navigate("Login");
      }
    };

    checkLoggedIn();
  }, [navigation]); // Make sure to include navigation in the dependency array

  // Return null as CheckUserLoggedIn is not a visual component
  return null;
};

export default CheckUserLoggedIn;
