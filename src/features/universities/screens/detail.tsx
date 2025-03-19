import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { University } from '../types/university';
import { Icon } from '@/components/icons/Icon';
import * as Clipboard from 'expo-clipboard';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type UniversityDetailProps = {
  university: University | null,
  onClose: () => void
}

const UniversityDetail = ({ university, onClose }: UniversityDetailProps) => {
  const handleWebsitePress = (url: string) => {
    Linking.openURL(url);
  };

  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
  };

  const goToMap = () => {
    Linking.openURL(`https://www.google.com.br/maps/place/${university?.country}`)
  }

  return (
    <View className="flex-1 bg-white rounded-t-xl">
      <View className="w-full items-center pt-2 pb-4">
        <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </View>

      <View className="px-5">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold flex-1 mr-3">{university?.name}</Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-gray-100 p-2 rounded-full flex-shrink-0"
          >
            <Icon name="X" size={18} strokeWidth={2.5} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-40'>
          {university && (
            <View className="gap-y-4 pb-8">
              <View className="bg-primary/10 rounded-xl p-4">
                <TouchableOpacity onPress={goToMap} className='flex-row items-center justify-between'>
                  <View className='flex-row items-center gap-x-4'>
                    <Icon name="MapPin" size={18} className='text-primary' />
                    <View className='gap-y-2'>
                      <Text className="text-gray-800 font-semibold">País</Text>
                      <Text className="text-gray-700">{university.country}</Text>
                    </View>
                  </View>
                  <Icon name='MapPinned' size={18} className='text-primary' />
                </TouchableOpacity>
              </View>

              {university?.web_pages && university.web_pages.length > 0 && (
                <View className="bg-primary/10 rounded-xl p-4 flex-row items-center gap-x-4">
                  <Icon name="Globe" size={18} className='text-primary' />
                  <View>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-gray-800 font-semibold">Website</Text>
                    </View>
                    {university.web_pages.map((webpage, index) => (
                      <TouchableOpacity
                        key={index}
                        className='my-1'
                        onPress={() => handleWebsitePress(webpage)}
                      >
                        <Text className="text-blue-600 underline">{webpage}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {university.domains && university.domains.length > 0 && (
                <View className="bg-primary/10 rounded-xl p-4 flex-row items-center gap-x-4">
                  <Icon name="AtSign" size={18} className='text-primary' />
                  <View>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-gray-800 font-semibold">Domains</Text>
                    </View>
                    {university.domains.map((domain, index) => (
                      <Popover key={domain}>
                        <PopoverTrigger asChild>
                          <TouchableOpacity onPress={() => copyToClipboard(domain)} className='flex-row gap-x-2 items-center'>
                            <Text key={index} className="text-gray-700 my-1">{domain}</Text>
                            <Icon name='Copy' className='text-primary' size={14} />
                          </TouchableOpacity>
                        </PopoverTrigger>
                        <PopoverContent className="bg-primary-foreground">
                          <Text className='text-xs text-primary'>Copiado!</Text>
                        </PopoverContent>
                      </Popover>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default UniversityDetail;
