import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

const Header = () => {
  const insets = useSafeAreaInsets();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      style={{ paddingTop: insets.top + 10 }}
      className="bg-primary flex-row items-center p-6 shadow-sm shadow-slate-800 elevation-sm"
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text className="text-xl font-semibold">
          UNIVERSIDADES
        </Text>
      </Animated.View>
    </View>
  );
};

export { Header };
