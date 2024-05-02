import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Product from './Product';

const Logo = require('../Image/Logo.png');


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const data=['1','2','3','4','5','6','7','8','9','10'];

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        console.log('API response:', res);
        return res.json();
      })
      .then((data) => {
        console.log('Data:', data);
        // Assuming data is an array of products
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
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

  console.log('Products:', products);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.text}>Welcome to the Home Page</Text>
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
    margin: 10,
  },
  logo: {
    width: 200,
    height: 200,
    margin: 20,
    resizeMode: 'contain',
  },
});

export default Home;
