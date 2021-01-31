import React, { useState, useEffect } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../../services/firebase';

import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import DatePicker from '../../components/DatePicker';

import {
  Background,
  Container,
  Name,
  Balance,
  Title,
  List,
  Area,
} from './styles';

export default function Home() {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);

  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleShowPicker = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    firebase
      .database()
      .ref('users')
      .child(user.uid)
      .on('value', snapshot => {
        setBalance(snapshot.val().balance);
      });
  }, [user]);

  useEffect(() => {
    firebase
      .database()
      .ref('historic')
      .child(user.uid)
      .orderByChild('date')
      .equalTo(format(date, 'dd/MM/yyyy'))
      .limitToLast(10)
      .on('value', snapshot => {
        setData([]);
        const items = [];

        snapshot.forEach(childItem => {
          items.push({
            key: childItem.key,
            type: childItem.val().type,
            value: childItem.val().value,
            date: childItem.val().date,
          });
        });

        setData(items.reverse());
      });
  }, [user, date]);

  async function handleDeleteSuccess(payload) {
    console.log(payload);

    firebase
      .database()
      .ref('historic')
      .child(user.uid)
      .child(payload.key)
      .remove()
      .then(() => {
        let currentBalance = balance;

        payload.type === 'despesa'
          ? (currentBalance += parseFloat(payload.value))
          : (currentBalance -= parseFloat(payload.value));

        firebase
          .database()
          .ref('users')
          .child(user.uid)
          .child('balance')
          .set(currentBalance);
      });
  }

  function handleDelete(payload) {
    Alert.alert(
      'Cuidado, atenção!',
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor} ?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => handleDeleteSuccess(payload) },
      ]
    );
  }

  function handleChange(value) {
    setShow(Platform.OS === 'ios');
    setDate(value);
  }

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.name}</Name>
        <Balance>
          R$ {balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </Balance>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" size={30} color="#fff" />
        </TouchableOpacity>
        <Title>Última movimentações</Title>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <ListItem data={item} deleteItem={handleDelete} />
        )}
      />

      {show && (
        <DatePicker onChange={handleChange} date={date} onClose={handleClose} />
      )}
    </Background>
  );
}
