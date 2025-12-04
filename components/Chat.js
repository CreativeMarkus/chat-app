import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, ...props }) => {
    const { db } = props;
    const { userID, name, bgColor } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });

        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => {
                return {
                    _id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt.toDate(),
                };
            });

            setMessages(messages);
        });

        return () => unsubscribe();
    }, []);

    const onSend = (newMessages) => {
        const message = newMessages[0];

        addDoc(collection(db, "messages"), {
            _id: message._id,
            text: message.text,
            createdAt: new Date(),
            user: message.user
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