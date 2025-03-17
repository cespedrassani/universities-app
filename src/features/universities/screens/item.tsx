import { University } from '@/features/universities/types/university';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import UniversityDetail from './detail';
import { Icon } from '@/components/icons/Icon';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type UniversityItemProps = {
  item: University;
  index: number;
  pageSize: number;
  onPress: (item: University) => void;
};

export const UniversityItem: React.FC<UniversityItemProps> = ({ item, index, pageSize, onPress }) => {
  if (item.empty) {
    return <View className="flex-1 m-1.5" />;
  }

  const animationIndex = index % pageSize;

  return (
    <AnimatedTouchable
      className="flex-1 m-1.5 bg-primary-foreground rounded-lg shadow-sm shadow-slate-200 elevation-md"
      entering={FadeInDown.delay(animationIndex * 100).springify()}
      onPress={() => onPress(item)}
    >
      <Animated.View className="p-4 gap-y-2">
        <Text numberOfLines={2} className="text-lg font-bold">{item.name}</Text>
        <View className="flex-row items-center mb-1">
          <Text className="text-sm font-normal text-gray-600">{item.country}</Text>
          <Text className="ml-2 text-xs text-white bg-primary px-1 rounded-sm">{item.alpha_two_code}</Text>
        </View>
        {item.domains && item.domains.length > 0 && (
          <View>
            {item.domains.map((domain) => (
              <View key={domain} className='flex-row items-center gap-x-1'>
                <Icon name="Globe" className='text-primary' size={12} />
                <Text className='text-xs text-gray-600' numberOfLines={1}>{domain}</Text>
              </View>
            ))}
          </View>
        )}
        {item.state_province && (
          <Text className="text-xs text-gray-500 mb-1">{item.state_province}</Text>
        )}
      </Animated.View>
    </AnimatedTouchable>
  );
};
