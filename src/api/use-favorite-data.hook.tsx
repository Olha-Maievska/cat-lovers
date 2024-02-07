import { useInfiniteQuery, useQuery } from 'react-query'
import { api } from '../core/api'
import { GetFavoriteDto } from './dto/get-favorite-dto'

interface GetFavoriteParams {
  page: number
}

const getFavorite = async ({ page }: GetFavoriteParams) => {
  const { data } = await api.get<GetFavoriteDto>(
    'https://api.thecatapi.com/v1/favourites',
    {
      params: {
        sub_id: 'headofs_notes',
        limit: 8,
        page,
      },
    }
  )

  return data
}

export const useFavoriteData = () => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      'getFavorite',
      ({ pageParam }) => getFavorite({ page: pageParam }),
      {
        getNextPageParam: (lastPage, pages) => pages.length,
      }
    )

  return { data, isLoading, isError, fetchNextPage, isFetchingNextPage }
}
