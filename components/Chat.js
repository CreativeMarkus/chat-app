import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, color } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.text}>Hello Chat Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Chat;