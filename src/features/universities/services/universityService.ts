import api from '@/lib/api';
import { PaginatedResponse } from '@/types/paginated-response';
import { University } from '@/features/universities/types/university';

export const fetchUniversities = async ({
  pageParam = 0,
  pageSize = 20
}): Promise<PaginatedResponse> => {
  try {
    const limit = pageSize;
    const offset = pageParam * pageSize;

    const response = await api.get('universities', {
      params: {
        limit,
        offset
      }
    });

    const universities: University[] = response.data.items;
    const hasMore = universities.length === pageSize;

    return {
      items: universities,
      nextPage: hasMore ? pageParam + 1 : null,
      totalItems: hasMore ? -1 : offset + universities.length
    };
  } catch (error) {
    console.error("Erro ao buscar universidades:", error);
    throw error;
  }
};

export const searchUniversities = async (context: any): Promise<PaginatedResponse> => {
  try {
    const [_, query] = context.queryKey;

    if (!query) {
      return { items: [], nextPage: null, totalItems: 0 };
    }

    const response = await api.get(`universities/search?${query}`);

    const universities: University[] = response.data.items;

    return {
      items: universities,
      nextPage: null,
      totalItems: universities.length
    };
  } catch (error) {
    console.error("Erro ao pesquisar universidades:", error);
    throw error;
  }
};
