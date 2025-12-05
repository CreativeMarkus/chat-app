import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const SimpleChat = ({ route, navigation }) => {
    const { userID = '1', name = 'User', bgColor = '#090C08' } = route.params || {};
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });

        setMessages([
            {
                _id: 1,
                text: `Hello ${name}! This is a simple chat without Firebase.`,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'System',
                },
            },
        ]);
    }, []);

    const onSend = (newMessages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    };

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SimpleChat;