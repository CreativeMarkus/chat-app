import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useHeaderHeight } from '@react-navigation/elements';

const Chat = ({ route, navigation }) => {
    // Extract navigation parameters passed from Start screen
    const { name, color } = route.params;

    // Get the real header height
    const headerHeight = useHeaderHeight();

    // Current user ID and name for GiftedChat
    const currentUserId = 1;
    const currentUserName = name;

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
                _id: 1, // Unique identifier for the message
                text: 'Hello developer.',
                createdAt: new Date(),
                user: {
                    _id: 2, // Different from current user (_id: 1)
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: "You've entered the chat.",
                createdAt: new Date(),
                system: true, // System message flag for special styling
            },
        ]);
    }, []);

    /**
     * HANDLE SEND FUNCTION
     * Handles sending new messages by appending them to the existing message array
     * @param {Array} newMessages - Array of new message objects to add
     */
    const handleSend = (newMessages = []) => {
        setMessages(previousMessages => {
            // Ensure each new message has a unique _id and proper structure
            const processedMessages = newMessages.map(message => ({
                _id: message._id || Math.round(Math.random() * 1000000),
                text: message.text,
                createdAt: message.createdAt || new Date(),
                user: {
                    _id: message.user._id,
                    name: message.user.name || currentUserName,
                }
            }));
            return GiftedChat.append(previousMessages, processedMessages);
        });
    };

    // Custom bubble rendering function
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000', // Right bubble: black background
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight - 20 : 110}
            >
                <GiftedChat
                    messages={messages}
                    onSend={newMessages => handleSend(newMessages)}
                    user={{ _id: currentUserId, name: currentUserName }}
                    renderBubble={renderBubble}
                    placeholder="Type a message..."
                    listViewProps={{
                        keyExtractor: (item) => item._id.toString()
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Chat;