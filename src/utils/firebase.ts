import { getAuth } from 'firebase/auth';
// firebase.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA6V4nQLqLC_G5Z6sjaWOmd6pAYxm-cGx4',
  authDomain: 'swing-c887c.firebaseapp.com',
  databaseURL: 'https://swing-c887c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'swing-c887c',
  storageBucket: 'swing-c887c.appspot.com',
  messagingSenderId: '392357019008',
  appId: '1:392357019008:web:c4b40a9e7d21cc09209565',
  measurementId: 'G-68082W4CV7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
