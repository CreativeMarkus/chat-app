import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useHeaderHeight } from '@react-navigation/elements';
import { collection, query, onSnapshot, orderBy, addDoc } from 'firebase/firestore';

const Chat = ({ db, route, navigation }) => {
    const { userID, name, color } = route.params;
    const [messages, setMessages] = useState([]);
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        navigation.setOptions({ title: name });

        // Create Firestore query for messages, ordered by createdAt in descending order
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        // Set up real-time listener for messages
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newMessages = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    _id: doc.id,
                    text: data.text,
                    createdAt: new Date(data.createdAt.toMillis()),
                    user: {
                        _id: data.user._id,
                        name: data.user.name,
                        avatar: data.user.avatar || null,
                    },
                    system: data.system || false,
                };
            });
            setMessages(newMessages);
        });

        // Return cleanup function to unsubscribe from listener
        return () => unsubscribe();
    }, []);

    const onSend = (newMessages = []) => {
        addDoc(collection(db, "messages"), newMessages[0]);
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
            style={{ flex: 1, backgroundColor: color }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight}
        >
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name,
                }}
                renderBubble={renderBubble}
            />
        </KeyboardAvoidingView>
    );
};

export default Chat;