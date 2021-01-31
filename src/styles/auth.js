import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 15px;
`;

export const AreaInput = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.2)',
})`
  background-color: rgba(0, 0, 0, 0.2);
  width: 90%;
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
`;

export const SubmitButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
  background-color: #00b94a;
  width: 90%;
  height: 45px;
  border-radius: 8px;
  margin-top: 10px;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

export const Link = styled.TouchableOpacity`
  margin: 15px 0;
`;

export const LinkText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
