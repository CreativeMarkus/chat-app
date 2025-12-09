// Chat App - Firebase Enabled Version
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Firebase-enabled components
import Start from './components/Start_firebase';
import Chat from './components/Chat_firebase';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  console.log("App starting - Firebase enabled version...");

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;