import { useState, useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';

export const useSearchAnimations = (searchQuery: string) => {
  const [isFocused, setIsFocused] = useState(false);

  const searchOpacity = useSharedValue(0);
  const searchScale = useSharedValue(0.95);
  const searchWidth = useSharedValue(0);
  const searchInputFocus = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  useEffect(() => {
    searchOpacity.value = withTiming(1, { duration: 800 });
    searchScale.value = withSpring(1, { damping: 14, stiffness: 100 });

    setTimeout(() => {
      pulseAnimation.value = withSequence(
        withTiming(1.03, { duration: 700 }),
        withTiming(1, { duration: 700 })
      );
    }, 1500);
  }, []);

  useEffect(() => {
    if (isFocused) {
      searchInputFocus.value = withTiming(1, { duration: 300 });
      searchWidth.value = withSpring(1, { damping: 20, stiffness: 90 });
    } else {
      searchInputFocus.value = withTiming(0, { duration: 300 });
      if (searchQuery.length === 0) {
        searchWidth.value = withSpring(0, { damping: 20, stiffness: 90 });
      }
    }
  }, [isFocused, searchQuery.length]);

  const searchBarStyle = useAnimatedStyle(() => ({
    opacity: searchOpacity.value,
    transform: [
      {
        scale: interpolate(
          searchScale.value * pulseAnimation.value,
          [0, 1],
          [0.9, 1],
          Extrapolation.CLAMP
        )
      },
      { translateY: withSpring(searchOpacity.value * 0, { damping: 20 }) }
    ],
    shadowOpacity: interpolate(
      searchInputFocus.value,
      [0, 1],
      [0.1, 0.3],
      Extrapolation.CLAMP
    )
  }));

  const searchIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          searchInputFocus.value,
          [0, 1],
          [1, 0.85],
          Extrapolation.CLAMP
        )
      },
      {
        translateX: interpolate(
          searchInputFocus.value,
          [0, 1],
          [0, -4],
          Extrapolation.CLAMP
        )
      }
    ]
  }));

  const placeholderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      searchInputFocus.value,
      [0, 0.5],
      [1, 0],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateX: interpolate(
          searchInputFocus.value,
          [0, 1],
          [0, -20],
          Extrapolation.CLAMP
        )
      }
    ]
  }));

  const inputContainerStyle = useAnimatedStyle(() => ({
    flex: interpolate(
      searchWidth.value,
      [0, 1],
      [0.2, 1],
      Extrapolation.CLAMP
    )
  }));

  return {
    isFocused,
    setIsFocused,
    searchBarStyle,
    searchIconStyle,
    placeholderStyle,
    inputContainerStyle
  };
};
