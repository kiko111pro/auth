import React, {ReactElement, useState} from 'react';
import {TextInput, View, TextInputProps, ColorValue} from 'react-native';
import {Text} from '.';
import {fontData} from './Text';
import {colors, fontName} from '../utils/constants';

interface IInputProps extends TextInputProps {
  title?: string;
}

const Input = (props: IInputProps): ReactElement => {
  const [backgroundColor, setBackgroundColor] = useState<ColorValue>(
    colors.highlight1,
  );
  return (
    <View style={{borderWidth: 1, width: '100%', gap: 5}}>
      {<Text variant="heading.h5">{'Title'}</Text>}
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            backgroundColor: '#fff',
            borderColor: backgroundColor,
            paddingHorizontal: 16,
            // paddingVertical: 14,
            borderRadius: 12,
            height: 48,
            fontSize: 14,
            fontFamily: fontName.regular,
          }}
          onFocus={() => setBackgroundColor(colors.highlight1)}
          onBlur={() => setBackgroundColor('#ccc')}
          {...props}
        />
      </View>
      <Text variant="heading.h2">Error Message</Text>
    </View>
  );
};

export default Input;
