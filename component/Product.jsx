import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';

export default function Product({data}) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ProductDescription', { product: data });
    };

    console.log(data);
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Text>{data.category}</Text>
                <Text>{data.price}</Text>
                <Image style={styles.logo} source={{uri: data.image}} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({  
    container: {
        width: 150, // Increase width
        height: 200, // Increase height
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 10,
        color: 'black',
        padding: 10, 
    },
    logo: {
        width: 100,
        height: 100,
    }
});