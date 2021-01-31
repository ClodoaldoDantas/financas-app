import React from 'react';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

import {
  Container,
  Name,
  NewLink,
  NewLinkText,
  Logout,
  LogoutText,
} from './styles';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <Container>
      <Header />
      <Name>{user && user.name}</Name>

      <NewLink onPress={() => navigation.navigate('New')}>
        <NewLinkText>Registrar Gastos</NewLinkText>
      </NewLink>

      <Logout onPress={signOut}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}
