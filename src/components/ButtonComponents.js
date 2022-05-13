import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


const ButtonComponent = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#335599',
        padding: 10,
        width: '40%',
        borderRadius: 25,
        alignSelf: 'center',
        margin: '10%'
    },
    text: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center'
    }

})

export default ButtonComponent;