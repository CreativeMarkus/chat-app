import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <Text>Hello Start Screen!</Text>
            <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Type your username here"
            />
            <Button
                title="Go to Chat"
                onPress={() => navigation.navigate('Chat', { name: name })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
});

export default Start;