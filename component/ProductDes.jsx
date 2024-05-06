import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDes = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>{product.title}</Text>
      
      {product.image && <Image 
  style={styles.logo} 
  source={{ uri: product.image }} 
  onError={(error) => console.log(error)} 
 />}
 <Text style={styles.text}>INR {product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disp: {
        justifyContent: 'space-between',
        
    },
    textHeading: {
        fontSize: 30,
        color: '#000',
        margin: 5,
        textAlign: 'center',

    },

    text: {
        fontSize: 20,
        color: '#000',
        margin: 5,
        textAlign: 'center',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    logo: {
        width: 200,
        height: 200,
        margin: 10,
        resizeMode: 'contain',
        

    },
    });

export default ProductDes;