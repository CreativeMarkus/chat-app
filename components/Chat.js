import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet, FlatList, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useHeaderHeight } from '@react-navigation/elements';

const Chat = ({ route, navigation }) => {
    // Extract navigation parameters passed from Start screen
    const { name, color } = route.params;

    // Get the real header height
    const headerHeight = useHeaderHeight();

    /**
     * STATE INITIALIZATION
     * Initialize messages state as an empty array to store chat messages
     * Each message object will contain _id, text, createdAt, user, and optional system properties
     */
    const [messages, setMessages] = useState([]);

    /**
     * USEEFFECT LOGIC
     * Runs once when component mounts to:
     * 1. Set the navigation header title to the user's name
     * 2. Preload initial welcome messages for better user experience
     */
    useEffect(() => {
        // Set navigation title to user's name from route params
        navigation.setOptions({ title: name });

        // Preload initial messages - system message and welcome message
        // Messages are ordered with most recent first (GiftedChat requirement)
        setMessages([
            {
                _id: Math.round(Math.random() * 1000000), // Unique identifier for the message
                text: 'Hello developer.',
                createdAt: new Date(),
                user: {
                    _id: 2, // Different from current user (_id: 1)
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: Math.round(Math.random() * 1000000),
                text: "You've entered the chat.",
                createdAt: new Date(),
                system: true, // System message flag for special styling
            },
        ]);
    }, []);

    /**
     * ONSEND FUNCTION
     * Handles sending new messages by appending them to the existing message array
     * @param {Array} newMessages - Array of new message objects to add
     */
    const onSend = (newMessages = []) => {
        setMessages(previousMessages => [...newMessages, ...previousMessages]);
    };

    const [inputText, setInputText] = useState('');

    // Custom bubble rendering function
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Right bubble: black background
                    },
                    left: {
                        backgroundColor: '#FFF', // Left bubble: white background
                    },
                }}
                textStyle={{
                    right: {
                        color: '#FFF', // Right bubble: white text
                    },
                    left: {
                        color: '#000', // Left bubble: black text
                    },
                }}
            />
        );
    };

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage = {
                _id: Math.round(Math.random() * 1000000),
                text: inputText,
                createdAt: new Date(),
                user: { _id: 1 }
            };
            onSend([newMessage]);
            setInputText('');
        }
    };

    const renderMessage = ({ item }) => {
        if (!item || !item._id) return null;

        const isCurrentUser = item.user && item.user._id === 1;
        const isSystem = item.system;

        if (isSystem) {
            return (
                <View key={item._id} style={styles.systemMessage}>
                    <Text style={styles.systemText}>{item.text}</Text>
                </View>
            );
        }

        return (
            <View key={item._id} style={[styles.messageContainer, isCurrentUser ? styles.rightMessage : styles.leftMessage]}>
                <View style={[styles.bubble, isCurrentUser ? styles.rightBubble : styles.leftBubble]}>
                    <Text style={[styles.messageText, isCurrentUser ? styles.rightText : styles.leftText]}>
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={[styles.container, styles.lightGreyBackground]}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight - 20 : 110}
            >
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item, index) =>
                        item && item._id ? item._id.toString() : index.toString()
                    }
                    inverted
                    style={styles.messagesList}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type a message..."
                        multiline
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    lightGreyBackground: {
        backgroundColor: '#F5F5F5',
    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    messageContainer: {
        marginVertical: 5,
    },
    rightMessage: {
        alignItems: 'flex-end',
    },
    leftMessage: {
        alignItems: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    rightBubble: {
        backgroundColor: '#000',
    },
    leftBubble: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    messageText: {
        fontSize: 16,
    },
    rightText: {
        color: '#FFF',
    },
    leftText: {
        color: '#000',
    },
    systemMessage: {
        alignItems: 'center',
        marginVertical: 10,
    },
    systemText: {
        color: '#999',
        fontSize: 14,
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFF',
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        maxHeight: 100,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default Chat;