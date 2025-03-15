import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import { Icon } from '@/components/icons/Icon';
import { useSearchAnimations } from '@/hooks/useSearchAnimations';
import { cn } from '@/utils/cn';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [country, setCountry] = useState('');
  const [domain, setDomain] = useState('');
  const [name, setName] = useState('');

  const {
    setIsFocused,
    searchBarStyle,
    searchIconStyle,
    placeholderStyle,
    inputContainerStyle,
  } = useSearchAnimations(searchQuery);

  const expandedMenuStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isMenuExpanded ? 140 : 0, { duration: 300 }),
      opacity: withTiming(isMenuExpanded ? 1 : 0, { duration: 300 }),
    };
  });

  const menuIconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      isMenuExpanded ? 1 : 0,
      [0, 1],
      [0, 90]
    );

    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  useEffect(() => {
    if (name || country || domain) {
      const combinedQuery = `name=${name}&country=${country}&domain=${domain}`.trim();
      setSearchQuery(combinedQuery);
    } else {
      setSearchQuery('');
    }
  }, [name, country, domain]);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const handleChangeName = (text: string) => {
    setSearchQuery(`name=${text}`)
    setName(text)
  }

  return (
    <View>
      <Animated.View
        style={searchBarStyle}
        className={cn("bg-primary-foreground shadow-sm shadow-slate-800 elevation-sm rounded-lg m-4 mb-0 h-12 items-center flex-row px-4", {
          'rounded-b-none': isMenuExpanded
        })}
      >
        <Animated.View style={searchIconStyle}>
          <Icon name="Search" className="text-primary" />
        </Animated.View>

        <Animated.View className="flex-1 ml-2" style={inputContainerStyle}>
          <Animated.View
            style={placeholderStyle}
            className="absolute left-0 top-0 bottom-0 justify-center"
            pointerEvents="none"
          >
            <Text className="text-gray-400">Buscar por nome</Text>
          </Animated.View>
          <TextInput
            className="h-full text-gray-800 flex-1"
            value={name}
            onChangeText={handleChangeName}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (name.length === 0) {
                setIsFocused(false);
              }
            }}
          />
        </Animated.View>

        {name.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setIsFocused(false);
              setName('')
            }}
            className="p-2"
          >
            <Icon name="X" size={18} className="text-gray-400" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={toggleMenu} className="mr-3">
          <Animated.View style={menuIconStyle}>
            <Icon name="Menu" className="text-primary" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[expandedMenuStyle]} className="mx-4 mb-2 bg-primary-foreground rounded-b-lg shadow-sm elevation-sm shadow-slate-300 px-4">
        <View className="py-3">
          <View className="flex-row items-center mb-3">
            <Icon name="MapPin" size={18} className="text-primary mr-2" />
            <TextInput
              className="h-10 flex-1 px-3 bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-300"
              placeholder="Buscar por país"
              value={country}
              onChangeText={setCountry}
            />
          </View>

          <View className="flex-row items-center mb-3">
            <Icon name="Globe" size={18} className="text-primary mr-2" />
            <TextInput
              className="h-10 flex-1 px-3 bg-gray-100 rounded-lg text-gray-800 placeholder:text-gray-300"
              placeholder="Buscar por domínio"
              value={domain}
              onChangeText={setDomain}
            />
          </View>

          <View className='flex-row justify-end gap-x-2'>
            <TouchableOpacity
              onPress={() => {
                setName('')
                setCountry('')
                setDomain('')
                setSearchQuery('')
                setIsFocused(false)
              }}
              className="bg-transparent p-1 px-3 rounded-lg items-center border-primary border"
            >
              <Text className="text-primary text-sm font-medium">Limpar tudo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
