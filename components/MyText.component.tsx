import React from 'react';
import { View, Text, StyleSheet, TextProps, TextStyle, StyleProp } from 'react-native';
import colors from '../Utils/colors';

type sizeType = 'big' | 'normal' | 'small';

type Props = TextProps & {
  size?: sizeType
  title: string
  color?: string
  style?: TextProps['style']
}

const getFontSize = (size: sizeType = 'normal') => {
  let fontSize = 16; 
  switch (size) {
    case 'big':
      fontSize = 21;
      break;
    case 'small':
      fontSize = 12;
      break;
  }
  return fontSize;
}

const MyText = (props: Props) => {
  const {size, style, title, color = colors.regularText, ...textProps} = props;
  const fontSize = getFontSize(size);
  return (
    <Text style={[style, styles.text, {fontSize, color}]} {...textProps}>{title}</Text>
  );
};

export default MyText;

const styles = StyleSheet.create({
  text: {
    color: colors.regularText,
    fontFamily: 'Roboto-Regular',
  }
});