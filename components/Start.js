import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

const COLORS = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

const Start = ({ navigation }) => {
    /**
     * STATE INITIALIZATION
     * Managing two pieces of state for the start screen:
     * 1. name: User's input name (string) - starts empty
     * 2. selectedColor: Currently selected background color - defaults to first color option
     */
    const [name, setName] = useState(''); // User's name input, initially empty string
    const [selectedColor, setSelectedColor] = useState(COLORS[0]); // Selected background color, defaults to first option

    return (
        // KEYBOARDAVOIDINGVIEW USAGE
        // Wraps entire screen to handle keyboard appearance:
        // - iOS: 'padding' behavior adds padding to push content up when keyboard shows
        // - Android: 'height' behavior resizes the view height to accommodate keyboard
        // Prevents the TextInput from being hidden behind the keyboard
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={styles.container}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.contentBox}>
                        <Text style={styles.title}>Chat App</Text>

                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder="Type your username here"
                            placeholderTextColor="#757083"
                        />

                        <Text style={styles.colorText}>Choose Background Color:</Text>
                        <View style={styles.colorContainer}>
                            {COLORS.map((color, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.colorOption,
                                        { backgroundColor: color },
                                        selectedColor === color && styles.selectedColor
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                    // ACCESSIBILITY PROPS for color selection buttons:
                                    // - accessible: Enables accessibility features
                                    // - accessibilityLabel: Descriptive label for screen readers
                                    // - accessibilityHint: Explains what the button does
                                    // - accessibilityRole: Identifies the element as a button
                                    // - accessibilityState: Indicates if this color is currently selected
                                    accessible={true}
                                    accessibilityLabel={`Select background color ${index + 1}`}
                                    accessibilityHint="Changes the chat background color"
                                    accessibilityRole="button"
                                    accessibilityState={{ selected: selectedColor === color }}
                                />
                            ))}
                        </View>

                        <Pressable
                            style={styles.chatButton}
                            onPress={() => navigation.navigate('Chat', { name: name, color: selectedColor })}
                            // ACCESSIBILITY PROPS for navigation button:
                            // - accessible: Enables accessibility support
                            // - accessibilityLabel: Clear description of button purpose
                            // - accessibilityHint: Explains the action that will be performed
                            // - accessibilityRole: Identifies this as an interactive button element
                            accessible={true}
                            accessibilityLabel="Start Chatting"
                            accessibilityHint="Navigate to the chat screen"
                            accessibilityRole="button"
                        >
                            <Text style={styles.chatButtonText}>Start Chatting</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50,
    },
    contentBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 30,
        borderRadius: 20,
        width: '88%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#757083',
        marginBottom: 30,
        textAlign: 'center',
    },
    textInput: {
        width: "100%",
        padding: 15,
        borderWidth: 2,
        borderColor: '#757083',
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        backgroundColor: '#FFFFFF',
    },
    colorText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#474056',
        marginBottom: 15,
        textAlign: 'center',
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedColor: {
        borderWidth: 3,
        borderColor: '#757083',
    },
    chatButton: {
        backgroundColor: '#757083',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    chatButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Start;