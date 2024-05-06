import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Product from './Product';

const Logo = require('../Image/Logo.png');



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    disp: {
      justifyContent:'space-between',
      flexWrap: 'wrap',
    },
    text: {
      fontSize: 20,
      color: '#000',
      margin: 5,
    },
    logo: {
      width: 100,
      height: 100,
      margin: 5,
      resizeMode: 'contain',
      
    },
  });

  const Home = ({ navigation }) => { // Destructure navigation from props
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message); // Use the error variable here
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.text}>Welcome to the Home Page</Text>
      <FlatList 

        data={products}
        renderItem={({ item }) => <Product key={item.id} data={item} />}
        keyExtractor={item => item.id}
        numColumns={2} // set number of columns to 2
        contentContainerStyle={styles.disp}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;