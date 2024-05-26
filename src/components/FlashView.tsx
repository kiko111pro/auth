// FlashView.tsx

import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, ViewStyle, StyleProp} from 'react-native';

interface FlashViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const FlashView: React.FC<FlashViewProps> = ({style, children}) => {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startAnimation();
  }, [opacityAnim]);

  return (
    <Animated.View style={[styles.flash, style, {opacity: opacityAnim}]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flash: {
    backgroundColor: '#E0E0E0',
  },
});

export default FlashView;
