import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, ...props }) => {
    const { db } = props;
    const { userID, name, bgColor } = route.params;
    const [messages, setMessages] = useState([]);

    if (!db) {
        console.error("Database not available");
        return null;
    }

    useEffect(() => {
        navigation.setOptions({ title: name });

        // Set up a simple welcome message first
        setMessages([
            {
                _id: 1,
                text: `Welcome to the chat, ${name}!`,
                createdAt: new Date(),
                system: true,
            },
        ]);

        // Then set up Firebase listener
        if (db) {
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const messages = snapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    return {
                        _id: doc.id,
                        text: firebaseData.text,
                        createdAt: firebaseData.createdAt ? firebaseData.createdAt.toDate() : new Date(),
                        user: firebaseData.user
                    };
                });

                setMessages(messages);
            }, (error) => {
                console.error("Error fetching messages: ", error);
                // Keep local messages if Firebase fails
            });

            return () => unsubscribe();
        }
    }, []);

    const onSend = (newMessages) => {
        const message = newMessages[0];

        addDoc(collection(db, "messages"), {
            _id: message._id,
            text: message.text,
            createdAt: new Date(),
            user: message.user
        }).catch((error) => {
            console.error("Error adding message: ", error);
        });
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000',
                    },
                    left: {
                        backgroundColor: '#FFF',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#FFF',
                    },
                    left: {
                        color: '#000',
                    },
                }}
            />
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: bgColor }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 56}
        >
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
                renderBubble={renderBubble}
            />
        </KeyboardAvoidingView>
    );
};

export default Chat;