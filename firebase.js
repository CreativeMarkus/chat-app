import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyDSx7cxIe4Ab3gWexOyRtz_b8ROwDDaHgg",
    authDomain: "chatapp-34f0e.firebaseapp.com",
    projectId: "chatapp-34f0e",
    storageBucket: "chatapp-34f0e.firebasestorage.app",
    messagingSenderId: "291405061906",
    appId: "1:291405061906:web:b22e8553d5d8cf96b21dcb"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };