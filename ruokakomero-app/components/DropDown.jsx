import React, { useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import  styles  from '../constants/styles';

  const data = [
    { label: 'Jääkaappi', value: 'jääkaappi' },
    { label: 'Pakastin', value: 'pakastin' },
    { label: 'Ruokakomero', value: 'ruokakomero' },
  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Valitse säilytyspaikka"
        searchPlaceholder="Etsi..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
    );
  };

  export default DropdownComponent;

  