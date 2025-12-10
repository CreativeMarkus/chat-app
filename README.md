# React Native Chat App

A feature-rich real-time chat application built with React Native, Expo, and Firebase. The app includes text messaging, image sharing, location sharing, and offline caching capabilities.

## 🚀 Features

- **Real-time Messaging**: Instant chat with Firebase Firestore
- **Image Sharing**: Camera capture and photo library integration
- **Location Sharing**: GPS coordinates with interactive maps
- **Offline Support**: Local message caching with AsyncStorage
- **Network Monitoring**: Automatic connection status detection
- **Custom UI**: Beautiful, responsive chat interface
- **Cross-Platform**: iOS, Android, and Web support
- **Accessibility**: Screen reader support and accessibility features

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** (recommended) - `npm install -g @expo/cli`
- **Expo Go** app on your mobile device
- **Android Studio** (for Android emulation) - [Setup guide](https://docs.expo.dev/workflow/android-studio-emulator/)
- **Xcode** (for iOS development on macOS) - [Setup guide](https://docs.expo.dev/workflow/ios-simulator/)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Install Dependencies
Run the following commands to install all required packages:

```bash
# Install main dependencies
npm install

# Install Expo-specific packages
npx expo install expo-location
npx expo install react-native-maps
npx expo install expo-image-picker
npx expo install @expo/react-native-action-sheet

# Install development dependencies
npm install --save-dev expo-module-scripts
```

### 3. Firebase Configuration

#### Option A: Use Mock Authentication (Default)
The app comes pre-configured with mock Firebase authentication for immediate testing.

#### Option B: Set Up Real Firebase (Production)
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database and Storage
3. Get your Firebase config object
4. Replace the mock configuration in `firebase_web.js`:

```javascript
// firebase_web.js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 4. Environment Setup (Optional)
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

## 🏃‍♂️ Running the Application

### Start Development Server
```bash
npx expo start
```

### Platform-Specific Commands
```bash
# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Run on Web
npx expo start --web

# Clear cache and start
npx expo start --clear
```

### Alternative Port (if 8081 is busy)
```bash
npx expo start --port 8085
```

## 📱 Testing the App

### 1. Basic Setup Test
1. Start the development server
2. Scan QR code with Expo Go or run in simulator
3. Enter your name and background color on Start screen
4. Navigate to Chat screen

### 2. Communication Features Testing

#### Text Messaging
1. Type a message in the text input
2. Press "Send" or hit Enter
3. Verify message appears in chat bubble
4. Check real-time sync across multiple devices

#### Image Sharing
1. Tap the "+" button next to text input
2. Select "Choose From Library" or "Take Photo"
3. Grant camera/photo permissions when prompted
4. Select or capture an image
5. Verify image uploads and displays in chat

#### Location Sharing
1. Tap the "+" button next to text input
2. Select "Share Location"
3. Grant location permissions when prompted
4. Verify map appears with your location marker
5. Check that coordinates are accurate

#### Offline Testing
1. Turn off internet connection
2. Send messages (they'll be cached locally)
3. Reconnect to internet
4. Verify messages sync to Firebase

### 3. Cross-Device Testing
1. Run app on multiple devices
2. Send messages from one device
3. Verify real-time message delivery on other devices
4. Test image and location sharing across devices

## 🛠 Troubleshooting

### Common Issues & Solutions

#### Metro Bundler Cache Issues
```bash
npx expo start --clear
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
```bash
# Kill processes on port 8081
npx kill-port 8081
# Or use alternative port
npx expo start --port 8086
```

#### TypeScript Configuration Warnings
The `expo-location/tsconfig.json` warning is cosmetic and doesn't affect functionality. The app works normally despite this warning.

#### Firebase Connection Issues
1. Check internet connection
2. Verify Firebase configuration
3. Check Firebase console for any service issues
4. Review browser console for detailed error messages

#### Permission Errors (Camera/Location)
1. Ensure you're testing on a physical device or properly configured simulator
2. Check device settings for app permissions
3. Reinstall the app if permissions seem stuck

#### Android Studio Emulator Setup
1. Install Android Studio
2. Set up AVD (Android Virtual Device)
3. Start emulator before running `npx expo start --android`

## 📁 Project Structure

```
chat-app/
├── components/
│   ├── Start.js              # Welcome screen with user setup
│   ├── Chat_firebase.js      # Main chat interface
│   ├── CustomActions.js      # Image/location sharing component
│   └── Welcome.js            # Additional welcome screen
├── assets/
│   └── images/               # App icons and images
├── firebase_web.js           # Firebase configuration
├── App.js                    # Main navigation container
├── index.js                  # Entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🔧 Key Dependencies

```json
{
  "expo": "~54.0.27",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "firebase": "9.23.0",
  "@react-navigation/native": "^7.1.21",
  "@react-navigation/native-stack": "^7.8.0",
  "@react-native-async-storage/async-storage": "1.24.0",
  "@react-native-community/netinfo": "11.4.1",
  "expo-image-picker": "~16.0.6",
  "expo-location": "~18.0.4",
  "react-native-maps": "1.18.0",
  "@expo/react-native-action-sheet": "~4.1.0"
}
```

## 🚀 Deployment

### Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Build for production
eas build --platform all

# Submit to app stores
eas submit
```

### Web Deployment
```bash
# Build for web
npx expo export --platform web

# Deploy to hosting service (Netlify, Vercel, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter issues:

1. **Check this README** for common solutions
2. **Review logs** in the Expo development tools
3. **Check Firebase Console** for backend issues
4. **Visit Expo Documentation**: https://docs.expo.dev/
5. **Firebase Documentation**: https://firebase.google.com/docs

## 🏆 Acknowledgments

- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)
- Real-time features powered by [Firebase](https://firebase.google.com/)
- Maps integration via [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- Image handling with [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

---

**Happy Chatting! 💬📱**