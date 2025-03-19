import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { SearchBar } from '@/components/common/search-bar';
import { UniversityItem } from './item';
import { useUniversityData } from '@/features/universities/hooks/useUniversityData';
import {
  ErrorState,
  EmptySearchState,
  LoadingState,
  LoadingFooter
} from './state';
import UniversityDetail from './detail';
import { University } from '../types/university';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { Icon } from '@/components/icons/Icon';

const UniversitiesScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const flatListRef = useRef<FlatList>(null);

  const [selectedItem, setSelectedItem] = useState<University | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const snapPoints = useMemo(() => ['30%', '60%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const {
    searchQuery,
    setSearchQuery,
    allItems,
    loadMoreData,
    isFetchingNextPage,
    status,
    searchStatus,
    isError,
    isSearchError,
    error,
    searchError,
    refetch,
    formatData,
    PAGE_SIZE
  } = useUniversityData();

  useEffect(() => {
    if (selectedItem) {
      bottomSheetRef.current?.expand();
      setIsOpen(true);
    } else {
      bottomSheetRef.current?.close();
      setIsOpen(false);
    }
  }, [selectedItem, isOpen]);

  const handleSelectItem = (item: University) => {
    if (selectedItem?.name === item.name && !isOpen) {
      setIsOpen(true);
    }
    setSelectedItem(item);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowScrollTopButton(scrollY > 300);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Animated.View entering={FadeIn.delay(300).duration(300)}>
        {allItems.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={formatData(allItems, 2)}
            renderItem={({ item, index }) => (
              <UniversityItem item={item} index={index} pageSize={PAGE_SIZE} onPress={(item) => handleSelectItem(item)} />
            )}
            numColumns={2}
            keyExtractor={(item, index) => item.name || `blank-${index}`}
            contentContainerClassName="px-3 pb-40"
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.3}
            ListFooterComponent={<LoadingFooter isLoading={isFetchingNextPage} />}
            refreshing={status === 'pending' && !isFetchingNextPage}
            onRefresh={refetch}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        ) : isError || isSearchError ? (
          <ErrorState
            error={error || searchError}
            onRetry={refetch}
          />
        ) : searchQuery.length > 0 && searchStatus !== 'pending' ? (
          <EmptySearchState />
        ) : (status === 'pending' || searchStatus === 'pending') && !isFetchingNextPage ? (
          <LoadingState />
        ) : null}

        {showScrollTopButton && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            className="absolute right-7 bottom-[15%]"
          >
            <TouchableOpacity
              onPress={scrollToTop}
              className="bg-primary w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-slate-300"
              activeOpacity={0.8}
            >
              <Icon name='ArrowUp' size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>

      <BottomSheet
        index={-1}
        handleComponent={null}
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        enableHandlePanningGesture
        enableContentPanningGesture
        backgroundStyle={{ backgroundColor: 'transparent' }}
        onClose={() => setSelectedItem(null)}
      >
        <UniversityDetail
          onClose={() => setSelectedItem(null)}
          university={selectedItem}
        />
      </BottomSheet>
    </View>
  );
};

export default UniversitiesScreen;
