import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, ...props }) => {
    const { userID, name, color } = route.params;
    const { db } = props;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name]);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    _id: data._id,
                    text: data.text,
                    createdAt: data.createdAt.toDate(),
                    user: data.user
                };
            });
            setMessages(messages);
        });
        return unsubscribe;
    }, []);

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    const renderMessage = ({ item }) => {
        const isMyMessage = item.user._id === userID;

        return (
            <View style={[
                styles.messageContainer,
                isMyMessage ? styles.myMessage : styles.otherMessage
            ]}>
                <Text style={styles.messageUser}>{item.user.name}</Text>
                <Text style={[
                    styles.messageText,
                    isMyMessage ? styles.myMessageText : styles.otherMessageText
                ]}>
                    {item.text}
                </Text>
                <Text style={styles.messageTime}>
                    {item.createdAt.toLocaleTimeString()}
                </Text>
            </View>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#007AFF',
                    },
                    left: {
                        backgroundColor: '#E5E5EA',
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
        <View style={{ flex: 1, backgroundColor: color }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 56}
            >
                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    user={{
                        _id: userID,
                        name: name,
                    }}
                    renderBubble={renderBubble}
                />
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesList: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
    },
    messageUser: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    messageText: {
        fontSize: 16,
        marginBottom: 2,
    },
    myMessageText: {
        color: 'white',
    },
    otherMessageText: {
        color: 'black',
    },
    messageTime: {
        fontSize: 10,
        opacity: 0.6,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
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
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Chat;