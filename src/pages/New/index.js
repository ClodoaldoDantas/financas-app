import React, { useState } from 'react';
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import firebase from '../../services/firebase';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';
import Picker from '../../components/Picker';
import { Background, Input, SubmitButton, SubmitText } from './styles';

export default function New() {
  const [cash, setCash] = useState('');
  const [type, setType] = useState('receita');

  const navigation = useNavigation();
  const { user: userState } = useAuth();

  async function handleAdd() {
    const uid = userState.uid;
    const key = await firebase.database().ref('historic').child(uid).push().key;

    await firebase
      .database()
      .ref('historic')
      .child(uid)
      .child(key)
      .set({
        type,
        value: parseFloat(cash),
        date: format(new Date(), 'dd/MM/yyyy'),
      });

    const user = firebase.database().ref('users').child(uid);
    const snapshot = await user.once('value');
    let balance = parseFloat(snapshot.val().balance);

    type === 'despesa'
      ? (balance -= parseFloat(cash))
      : (balance += parseFloat(cash));

    await user.child('balance').set(balance);

    Keyboard.dismiss();
    setCash('');
    navigation.navigate('Home');
  }

  function handleSubmit() {
    Keyboard.dismiss();

    if (isNaN(parseFloat(cash))) {
      alert('Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo: ${type} - Valor: ${parseFloat(cash)}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => handleAdd() },
      ]
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            keyboardType="numeric"
            returnKeyType="next"
            placeholder="Valor desejado"
            onSubmitEditing={() => Keyboard.dismiss()}
            onChangeText={text => setCash(text)}
            value={cash}
          />

          <Picker value={type} onChange={setType} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
