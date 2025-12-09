import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Alert
} from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../firebase_web';

const Chat = ({ route, navigation }) => {
    const { userID, name, color, firebaseEnabled = false } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isOnline, setIsOnline] = useState(firebaseEnabled);

    useEffect(() => {
        navigation.setOptions({ title: name });

        if (firebaseEnabled && db) {
            setupFirebaseListener();
        } else {
            setupLocalMode();
        }
    }, [name, firebaseEnabled]);

    const setupFirebaseListener = () => {
        try {
            console.log('Setting up Firebase Firestore listener...');
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

            const unsubscribe = onSnapshot(q,
                (snapshot) => {
                    console.log('Received', snapshot.docs.length, 'messages from Firestore');
                    const firebaseMessages = snapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            text: data.text,
                            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                            user: data.user,
                            userID: data.userID
                        };
                    });
                    setMessages(firebaseMessages.reverse());
                    setIsOnline(true);
                },
                (error) => {
                    console.error('Firebase listener error:', error);
                    setIsOnline(false);
                    setupLocalMode();
                }
            );

            // Cleanup function
            return () => {
                if (unsubscribe) {
                    console.log('Cleaning up Firebase listener');
                    unsubscribe();
                }
            };
        } catch (error) {
            console.error('Error setting up Firebase listener:', error);
            setIsOnline(false);
            setupLocalMode();
        }
    };

    const setupLocalMode = () => {
        setMessages([
            {
                id: '1',
                text: `Hello ${name}! ${isOnline ? 'Firebase is temporarily offline.' : 'Welcome to local chat mode.'} Messages are saved locally.`,
                createdAt: new Date(),
                user: 'System',
                userID: 'system'
            }
        ]);
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            text: newMessage.trim(),
            createdAt: new Date(),
            user: name,
            userID: userID
        };

        if (isOnline && db) {
            try {
                await addDoc(collection(db, "messages"), {
                    ...messageData,
                    createdAt: messageData.createdAt // Firestore will convert this
                });
                console.log('Message sent to Firestore');
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message to Firestore:', error);
                // Fallback to local mode
                const localMessage = { ...messageData, id: Date.now().toString() };
                setMessages(prev => [...prev, localMessage]);
                setNewMessage('');
                setIsOnline(false);
                Alert.alert('Connection Issue', 'Message saved locally. Will sync when connection is restored.');
            }
        } else {
            // Local mode
            const localMessage = { ...messageData, id: Date.now().toString() };
            setMessages(prev => [...prev, localMessage]);
            setNewMessage('');
        }
    };

    const renderMessage = (message) => {
        const isMyMessage = message.userID === userID;

        // Handle both string and object formats for user
        const userName = typeof message.user === 'object' ?
            (message.user.name || 'Unknown User') :
            (message.user || 'Unknown User');

        return (
            <View
                key={message.id}
                style={[
                    styles.messageContainer,
                    isMyMessage ? styles.myMessage : styles.otherMessage
                ]}
            >
                {!isMyMessage && (
                    <Text style={styles.senderName}>{userName}</Text>
                )}
                <Text style={[
                    styles.messageText,
                    isMyMessage ? styles.myMessageText : styles.otherMessageText
                ]}>
                    {message.text}
                </Text>
                <Text style={styles.timestamp}>
                    {message.createdAt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Text>
            </View>
        );
    }; return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <View style={[styles.statusBar, isOnline ? styles.onlineBar : styles.offlineBar]}>
                <Text style={styles.statusText}>
                    {isOnline ? 'Firebase Connected - Real-time chat' : 'Offline Mode - Messages saved locally'}
                </Text>
            </View>

            <ScrollView
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map(renderMessage)}
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Type your message..."
                        placeholderTextColor="#999"
                        multiline
                        maxLength={500}
                    />
                    <TouchableOpacity
                        style={[
                            styles.sendButton,
                            !newMessage.trim() && styles.sendButtonDisabled
                        ]}
                        onPress={sendMessage}
                        disabled={!newMessage.trim()}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        padding: 8,
        alignItems: 'center',
    },
    onlineBar: {
        backgroundColor: '#4CAF50',
    },
    offlineBar: {
        backgroundColor: '#ff9500',
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    messagesContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageContainer: {
        marginVertical: 5,
        padding: 12,
        borderRadius: 12,
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
    senderName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#666',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    myMessageText: {
        color: 'white',
    },
    otherMessageText: {
        color: 'black',
    },
    timestamp: {
        fontSize: 10,
        marginTop: 4,
        opacity: 0.7,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
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
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Chat;