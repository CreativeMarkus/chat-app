# Chat App

A React Native chat application built with Expo and React Navigation, featuring user name input and navigation between screens.

## Features

- **Two-Screen Navigation**: Navigate between Start and Chat screens
- **User Name Input**: Enter your username on the Start screen
- **Dynamic Header**: Chat screen header displays the entered username
- **Cross-Platform**: Runs on iOS, Android, and Web
- **Modern UI**: Clean and responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (optional but recommended)
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone or download the project**
   ```bash
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```
   
   Or if you have Expo CLI installed globally:
   ```bash
   expo start
   ```

4. **Run the app**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press `w` to run in web browser
   - Press `a` to run in Android emulator
   - Press `i` to run in iOS simulator

## Project Structure

```
chat-app/
├── components/
│   ├── Start.js          # Start screen with username input
│   └── Chat.js           # Chat screen with dynamic header
├── assets/               # Images and other assets
├── App.js               # Main navigation container
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## How It Works

### Start Screen (`components/Start.js`)
- Displays a welcome message
- Contains a text input for username entry
- "Go to Chat" button navigates to the Chat screen
- Passes the entered username as a route parameter

### Chat Screen (`components/Chat.js`)
- Receives the username from route parameters
- Dynamically sets the navigation header title to the username
- Displays the main chat interface

### Navigation (`App.js`)
- Uses React Navigation's Native Stack Navigator
- Wraps screens in NavigationContainer
- Handles navigation between Start and Chat screens

## Technologies Used

- **React Native**: Cross-platform mobile development framework
- **Expo**: Development platform for React Native apps
- **React Navigation**: Navigation library for React Native
  - `@react-navigation/native`: Core navigation functionality
  - `@react-navigation/native-stack`: Native stack navigator
- **React Hooks**: useState and useEffect for state management
- **React Native Components**: View, Text, TextInput, Button, StyleSheet

## Dependencies

```json
{
  "@react-navigation/native": "^7.1.21",
  "@react-navigation/native-stack": "^7.8.0",
  "expo": "~54.0.25",
  "expo-status-bar": "~3.0.8",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "react-native-screens": "~4.16.0",
  "react-native-safe-area-context": "~5.6.0"
}
```

## Styling

The app uses React Native's StyleSheet for styling:
- **Centered layouts** with flexbox
- **Responsive text input** with border and padding
- **Clean, minimal design** focusing on functionality

## Development

### Available Scripts

- `npm start` or `expo start`: Start the Expo development server
- `npm run android`: Run on Android device/emulator
- `npm run ios`: Run on iOS device/simulator
- `npm run web`: Run in web browser

### Troubleshooting

If you encounter module resolution errors:

1. **Clear cache and restart**
   ```bash
   npx expo start --clear
   ```

2. **Clean reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npx expo start --clear
   ```

3. **Check Expo CLI version**
   ```bash
   expo --version
   ```

## Future Enhancements

- Add real-time messaging functionality
- Implement user authentication
- Add message history storage
- Include emoji support
- Add file/image sharing capabilities
- Implement push notifications

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please:
- Check the troubleshooting section above
- Review [Expo documentation](https://docs.expo.dev/)
- Check [React Navigation documentation](https://reactnavigation.org/)

---

**Created using React Native and Expo**