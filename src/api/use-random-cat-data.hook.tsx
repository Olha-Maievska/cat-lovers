import { useInfiniteQuery } from 'react-query'
import { api } from '../core/api'
import { GetRandomCatsDto } from './dto/get-random-cats.dto'

interface GetRandomCatsParams {
  pageParam: number
  breedId?: string | null
}

const getRandomCats = async ({
  pageParam = 0,
  breedId,
}: GetRandomCatsParams) => {
  const { data } = await api.get<GetRandomCatsDto>(
    'https://api.thecatapi.com/v1/images/search',
    {
      params: {
        limit: 8,
        pageParam,
        breed_ids: breedId,
      },
    }
  )

  return data
}

interface UseRandomCatData {
  breedId?: string | null
}

export const useRandomData = ({ breedId }: UseRandomCatData = {}) => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      `getRandomCats-${breedId || 'random'}`,
      ({ pageParam }) => getRandomCats({ pageParam, breedId }),
      {
        getNextPageParam: () => Date.now(),
      }
    )

  return { data, isError, isLoading, fetchNextPage, isFetchingNextPage }
}
