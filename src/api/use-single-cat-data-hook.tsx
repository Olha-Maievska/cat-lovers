import { useQuery } from 'react-query'
import { api } from '../core/api'
import { GetSingleCatDto } from './dto/get-single-cat-dto'
import { useEffect } from 'react'

interface GetSingleCatParams {
  id: string
}

const getSingleCat = async ({ id }: GetSingleCatParams) => {
  const { data } = await api.get<GetSingleCatDto>(
    `https://api.thecatapi.com/v1/images/${id}`
  )

  return data
}

interface UseSingleCatDataParams {
  id: string | null
}

export const useSingleCatDataHook = ({ id }: UseSingleCatDataParams) => {
  const { data, isLoading, isError, refetch } = useQuery(
    `getSingleCat-${id}`,
    () => getSingleCat({ id: id || '' }),
    {
      enabled: false,
    }
  )

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id])

  return {
    data,
    isError,
    isLoading,
  }
}
