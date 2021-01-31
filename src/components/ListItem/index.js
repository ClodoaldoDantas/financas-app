import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Type, TypeText, IconContainer, ValueText } from './styles';

export default function ListItem({ data, deleteItem }) {
  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <Container>
        <Type>
          <IconContainer type={data.type}>
            <Icon
              name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
              color="#fff"
              size={20}
            />
            <TypeText>{data.type}</TypeText>
          </IconContainer>
        </Type>
        <ValueText>R$ {data.value}</ValueText>
      </Container>
    </TouchableWithoutFeedback>
  );
}
