import { getAuth, PhoneAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { initializeApp, getApp } from '@react-native-firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyDuOLOzodXvVMAg7gvSiJMDxhx00A9uimY",
    authDomain: "livehealthy-a27a2.firebaseapp.com",
    projectId: "livehealthy-a27a2",
    storageBucket: "livehealthy-a27a2.appspot.com",
    messagingSenderId: "853046217725",
    appId: "1:853046217725:web:9d2c4e0c6a960638956794",
    measurementId: "G-B605TMQPFW"
};

initializeApp(firebaseConfig);
var auth =getAuth();
var app =getApp();

export {auth ,app};