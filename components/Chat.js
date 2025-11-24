import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Hello Chat Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Chat;