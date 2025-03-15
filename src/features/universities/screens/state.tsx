import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from '@/components/icons/Icon';

type ErrorStateProps = {
  error: Error | null;
  onRetry: () => void;
};

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <View className="items-center justify-center p-10">
    <Icon name="Info" size={48} className="text-red-400 mb-4" />
    <Text className="text-gray-700 text-lg">Erro ao carregar dados</Text>
    <Text className="text-gray-500 text-center mt-2">
      {error?.toString() || "Ocorreu um erro ao buscar as universidades."}
    </Text>
    <TouchableOpacity
      className="mt-6 bg-blue-500 py-2 px-6 rounded-lg"
      onPress={onRetry}
    >
      <Text className="text-white font-medium">Tentar novamente</Text>
    </TouchableOpacity>
  </View>
);

export const EmptySearchState: React.FC = () => (
  <View className="items-center justify-center p-10">
    <Icon name="SearchX" size={48} className="text-gray-300 mb-4" />
    <Text className="text-gray-500 text-lg">Nenhuma universidade encontrada</Text>
    <Text className="text-gray-400 text-center mt-2">
      Tente uma pesquisa diferente ou verifique os filtros
    </Text>
  </View>
);

export const LoadingState: React.FC = () => (
  <View className="items-center justify-center p-10">
    <ActivityIndicator size="large" className='color-primary' />
  </View>
);

export const LoadingFooter: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View className="py-4 w-full items-center justify-center">
      <ActivityIndicator size="small" className='color-primary' />
    </View>
  );
};
