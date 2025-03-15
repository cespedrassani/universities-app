import { useState, useMemo, useCallback } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { University } from '@/features/universities/types/university';
import { fetchUniversities, searchUniversities } from '@/features/universities/services/universityService';

const PAGE_SIZE = 20;

export const useUniversityData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch: originalRefetch,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['universities'],
    queryFn: (context) => fetchUniversities({ ...context, pageSize: PAGE_SIZE }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled: searchQuery.trim() === '',
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const {
    data: searchData,
    status: searchStatus,
    isError: isSearchError,
    error: searchError,
  } = useInfiniteQuery({
    queryKey: ['searchUniversities', searchQuery],
    queryFn: searchUniversities,
    initialPageParam: 0,
    getNextPageParam: () => null,
    enabled: searchQuery.length > 3 && searchQuery.trim() !== '',
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });

  const refetch = useCallback(async () => {
    queryClient.setQueryData(['universities'], (oldData: any) => {
      if (!oldData || !oldData.pages || !oldData.pages.length) return oldData;
      return {
        pages: [oldData.pages[0]],
        pageParams: [oldData.pageParams[0]]
      };
    });
    return originalRefetch();
  }, [originalRefetch]);

  const allItems = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return searchData?.pages?.[0]?.items || [];
    }

    if (!data?.pages) return [];

    return data.pages.flatMap(page => page.items || []);
  }, [data, searchData, searchQuery]);

  const loadMoreData = () => {
    if (hasNextPage && !isFetchingNextPage && searchQuery.trim() === '') {
      fetchNextPage();
    }
  };

  const formatData = (data: University[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);

    if (numberOfElementsLastRow !== 0 && numberOfElementsLastRow !== numColumns) {
      const blankItems = Array.from(
        { length: numColumns - numberOfElementsLastRow },
        (_, index) => ({
          name: `blank-${numberOfElementsLastRow + index}`,
          country: "",
          alpha_two_code: "",
          domains: [],
          web_pages: [],
          empty: true
        } as University)
      );
      return [...data, ...blankItems];
    }

    return data;
  };

  return {
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
  };
};
