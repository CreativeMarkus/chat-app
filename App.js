// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import the screens
import Welcome from './components/Welcome';
import ShoppingLists from './components/ShoppingLists';
import Start from './components/Start';
import Chat from './components/Chat';

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBMUIXYuljva4lxVdIacsE6WEXo8MMAqRk",
    authDomain: "shopping-list-demo-b8219.firebaseapp.com",
    projectId: "shopping-list-demo-b8219",
    storageBucket: "shopping-list-demo-b8219.firebasestorage.app",
    messagingSenderId: "817991493456",
    appId: "1:817991493456:web:95bac59d5e696d12072e55"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome">
          {props => <Welcome app={app} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="ShoppingLists"
        >
          {props => <ShoppingLists db={db} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          initialParams={{ db }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
