// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBKU7ztlJpohzMwJBQgOPgMlzOFdy9g3Wk',
  authDomain: 'foodorder-10e1d.firebaseapp.com',
  projectId: 'foodorder-10e1d',
  storageBucket: 'foodorder-10e1d.appspot.com',
  messagingSenderId: '46121427716',
  appId: '1:46121427716:web:8a0bf4e8b08176c04da651',
  measurementId: 'G-YT7VXQD71P',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(() => AsyncStorage),
});
const storage = getStorage(app);
const firebaseDatabase = getDatabase(app);
const fireStoreDatabase = getFirestore(app);

export {
  auth,
  storage,
  firebaseDatabase,
  fireStoreDatabase,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
