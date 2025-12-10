import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const { showActionSheetWithOptions } = useActionSheet();

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Photo', 'Share Location', 'Cancel'];
        const cancelButtonIndex = 3;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        break;
                    case 1:
                        takePhoto();
                        break;
                    case 2:
                        getLocation();
                        break;
                    default:
                        break;
                }
            }
        );
    };

    const uploadAndSendImage = async (imageURI) => {
        try {
            // Convert URI to blob
            const response = await fetch(imageURI);
            const blob = await response.blob();

            // Generate unique reference using userID + timestamp + filename
            const filename = imageURI.split('/').pop() || 'image.jpg';
            const timestamp = Date.now();
            const uniqueRef = `${userID}_${timestamp}_${filename}`;
            const imageRef = ref(storage, `images/${uniqueRef}`);

            // Upload blob to Firebase Storage
            await uploadBytes(imageRef, blob);

            // Get download URL
            const downloadURL = await getDownloadURL(imageRef);

            // Call onSend with image URL
            onSend({
                _id: Math.random().toString(),
                text: '',
                createdAt: new Date(),
                user: {
                    _id: userID,
                    name: 'User',
                },
                image: downloadURL,
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
    };

    const pickImage = async () => {
        // Request media library permission
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
            // Launch image library async
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                // If not canceled, call uploadAndSendImage with URI
                await uploadAndSendImage(result.assets[0].uri);
            }
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    };

    const takePhoto = async () => {
        // Request camera permissions async
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            // Launch camera async
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) {
                // If not canceled, call uploadAndSendImage with URI
                await uploadAndSendImage(result.assets[0].uri);
            }
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    };

    const getLocation = async () => {
        // Request location permission
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            // Retrieve coordinates with getCurrentPositionAsync
            try {
                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                // Call onSend with location data
                onSend({
                    _id: Math.random().toString(),
                    text: '',
                    createdAt: new Date(),
                    user: {
                        _id: userID,
                        name: 'User',
                    },
                    location: {
                        latitude,
                        longitude,
                    },
                });
            } catch (error) {
                console.error('Error getting location:', error);
                Alert.alert('Error', 'Failed to get location. Please try again.');
            }
        } else {
            Alert.alert("Location permissions haven't been granted.");
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onActionPress}
            accessible={true}
            accessibilityLabel="More actions"
            accessibilityHint="Choose to send an image, take a photo, or share location"
        >
            <Text style={styles.iconText}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 13,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;