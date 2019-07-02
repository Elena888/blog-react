import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
//import 'firebase/storage';  // If using Firebase storage
import {FirebaseConfig} from './keys';

// Initialize Firebase
firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database();

