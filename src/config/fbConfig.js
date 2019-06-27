import * as firebase from "firebase";
import {FirebaseConfig} from './keys';

// Initialize Firebase
firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database();

