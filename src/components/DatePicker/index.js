import React, { useState } from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container, Header } from './styles';

export default function DatePicker({ date, onClose, onChange }) {
  const [now, setNow] = useState(new Date(date));

  return (
    <Container>
      {Platform.OS === 'ios' && (
        <Header>
          <TouchableOpacity onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </Header>
      )}

      <DateTimePicker
        style={{ backgroundColor: '#fff' }}
        value={now}
        mode="date"
        display="default"
        onChange={(event, newValue) => {
          const currentDate = newValue || now;
          setNow(currentDate);
          onChange(currentDate);
        }}
      />
    </Container>
  );
}
