import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDED5fKELJ3dFDjOSu4Vs6E93inQcTeT9s',
  authDomain: 'financas-7845b.firebaseapp.com',
  databaseURL: 'https://financas-7845b-default-rtdb.firebaseio.com',
  projectId: 'financas-7845b',
  storageBucket: 'financas-7845b.appspot.com',
  messagingSenderId: '918852475222',
  appId: '1:918852475222:web:30509f9927cd94eb351ef7',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
