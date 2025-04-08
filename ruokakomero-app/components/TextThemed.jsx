import React from 'react';
import { Text } from 'react-native';

const TextThemed = ({ style, children, ...props }) => {
  return (
    <Text style={[{ fontFamily: 'Manrope-R' }, style]} {...props}>
      {children}
    </Text>
  );
};

export default TextThemed;