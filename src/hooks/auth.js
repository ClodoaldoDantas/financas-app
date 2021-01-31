import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from '../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const userStorage = await AsyncStorage.getItem('auth_user');

      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }

      setAppLoading(false);
    }

    loadStorage();
  }, []);

  async function storageUser(data) {
    await AsyncStorage.setItem('auth_user', JSON.stringify(data));
  }

  async function signIn(email, password) {
    setAuthLoading(true);

    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const uid = response.user.uid;
      const snapshot = await firebase
        .database()
        .ref('users')
        .child(uid)
        .once('value');

      const data = {
        uid,
        name: snapshot.val().name,
        email: response.user.email,
      };

      setUser(data);
      storageUser(data);
    } catch (error) {
      alert(error.code);
    } finally {
      setAuthLoading(false);
    }
  }

  async function signUp(email, password, name) {
    setAuthLoading(true);

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const uid = response.user.uid;

      await firebase.database().ref('users').child(uid).set({
        name,
        balance: 0,
      });

      const data = { name, email, uid };

      setUser(data);
      storageUser(data);
    } catch (error) {
      alert(error.code);
    } finally {
      setAuthLoading(false);
    }
  }

  async function signOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        appLoading,
        authLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
