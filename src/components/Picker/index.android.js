import React from 'react';
import { Picker as PickerSelect } from '@react-native-picker/picker';
import { PickerView } from './styles';

export default function Picker({ onChange, value }) {
  return (
    <PickerView>
      <PickerSelect
        selectedValue={value}
        onValueChange={text => onChange(text)}
        style={{ width: '100%' }}
      >
        <PickerSelect.Item label="Receita" value="receita" />
        <PickerSelect.Item label="Despesa" value="despesa" />
      </PickerSelect>
    </PickerView>
  );
}
