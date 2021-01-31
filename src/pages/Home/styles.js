import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;

export const Container = styled.View`
  margin-left: 15px;
  margin-bottom: 25px;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #fff;
  font-style: italic;
`;

export const Balance = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 16px;
  margin-left: 5px;
  color: #00b94a;
  margin-bottom: 10px;
`;

export const List = styled.FlatList.attrs({
  marginHorizontal: 15,
})`
  padding-top: 15px;
  background-color: #fff;

  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin: 0 8px;
`;

export const Area = styled.View`
  margin-left: 15px;
  flex-direction: row;
  align-items: baseline;
`;
