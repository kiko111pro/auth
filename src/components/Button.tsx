import {
  StyleSheet,
  Text,
  Pressable,
  PressableProps,
  DimensionValue,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

interface Props extends PressableProps {
  width?: DimensionValue;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  title: string;
}

const Button = (props: Props) => {
  return (
    <Pressable
      disabled={props.loading}
      style={{
        backgroundColor: '#741B47',
        width: props.width ? props.width : '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 14,
        borderRadius: 10,
        opacity: props.loading ? 0.6 : 1,
        gap: 8,
        ...props.style,
      }}
      {...props}>
      {props.loading && <ActivityIndicator />}
      <Text
        style={{
          color: '#fff',
          fontWeight: '700',
          fontSize: 18,
          ...props.textStyle,
        }}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
