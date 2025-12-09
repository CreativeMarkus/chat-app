// Firebase configuration that works with Expo Go
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDSx7cxIe4Ab3gWexOyRtz_b8ROwDDaHgg",
    authDomain: "chatapp-34f0e.firebaseapp.com",
    projectId: "chatapp-34f0e",
    storageBucket: "chatapp-34f0e.firebasestorage.app",
    messagingSenderId: "291405061906",
    appId: "1:291405061906:web:b22e8553d5d8cf96b21dcb"
};

// Initialize Firebase app once
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

// Initialize Firestore
const db = getFirestore(app);

// For Expo Go compatibility, we'll handle auth differently
// We'll create a mock auth that works locally
const createMockAuth = () => ({
    currentUser: null,
    signInAnonymously: async () => {
        const mockUser = {
            uid: 'mock-user-' + Date.now(),
            isAnonymous: true
        };
        return { user: mockUser };
    }
});

// Use mock auth for Expo Go compatibility
const auth = createMockAuth();

console.log('Firebase initialized for Expo Go (mock auth mode)');

export { app, auth, db };