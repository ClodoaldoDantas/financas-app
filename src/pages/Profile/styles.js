import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #131313;
  align-items: center;
`;

export const Name = styled.Text`
  text-align: center;
  font-size: 28px;
  margin: 25px 0;
  color: #fff;
`;

export const NewLink = styled(RectButton)`
  background-color: #00b94a;
  width: 90%;
  height: 45px;
  border-radius: 10px;
  margin-bottom: 10px;

  justify-content: center;
  align-items: center;
`;

export const NewLinkText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const Logout = styled(RectButton)`
  background-color: #c62c36;
  width: 90%;
  height: 45px;
  border-radius: 10px;
  margin-bottom: 10px;

  justify-content: center;
  align-items: center;
`;

export const LogoutText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
