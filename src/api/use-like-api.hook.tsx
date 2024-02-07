import { useEffect, useState } from 'react'
import { api } from '../core/api'
import { useMutation, useQueryClient } from 'react-query'
import { LikeCatDto } from './dto/like-cat.dto'
import { GetFavoriteDto } from './dto/get-favorite-dto'

interface CreateFavoriteParams {
  imageId: string
}

const createFavorite = async ({ imageId }: CreateFavoriteParams) => {
  const { data } = await api.post<LikeCatDto>(
    'https://api.thecatapi.com/v1/favourites',
    {
      image_id: imageId,
      sub_id: 'headofs_notes',
    }
  )

  return data
}

interface DeleteFavoriteId {
  favoriteId: number
}

const deleteFavorite = async ({ favoriteId }: DeleteFavoriteId) => {
  const data = await api.delete(
    `https://api.thecatapi.com/v1/favourites/${favoriteId}`
  )

  return data
}

interface GetSingleFavoriteParams {
  imageId: string
}

const getSingleFavorite = async ({ imageId }: GetSingleFavoriteParams) => {
  const { data } = await api.get<GetFavoriteDto>(
    'https://api.thecatapi.com/v1/favourites',
    {
      params: {
        image_id: imageId,
        sub_id: 'headofs_notes',
      },
    }
  )

  return data
}

interface UseLikeApiParams {
  catId: string | null
}

export const useLikeApi = ({ catId }: UseLikeApiParams) => {
  const [favoriteId, setFavoritesId] = useState<number | null>(null)
  const client = useQueryClient()
  const [isSingleFavoriteLoading, setIsSingleFavoriteLoading] = useState(false)

  useEffect(() => {
    setFavoritesId(null)

    const fetchSingleFavorite = async () => {
      if (!catId) {
        return
      }

      setIsSingleFavoriteLoading(true)

      try {
        const data = await client.fetchQuery({
          queryKey: `single-fav-${catId}`,
          queryFn: () => getSingleFavorite({ imageId: catId }),
        })

        setFavoritesId(data[0].id)
      } catch (e) {
      } finally {
        setIsSingleFavoriteLoading(false)
      }
    }

    fetchSingleFavorite()
  }, [catId])

  const likeMutation = useMutation(createFavorite)

  const like = async () => {
    if (!catId) {
      return
    }
    const { id } = await likeMutation.mutateAsync({ imageId: catId })
    setFavoritesId(id)
  }

  const deleteMutation = useMutation(deleteFavorite)

  const dislike = async () => {
    if (!catId || favoriteId === null) return

    await deleteMutation.mutateAsync({ favoriteId })

    setFavoritesId(null)
  }

  const isLiked = favoriteId !== null

  const isLoading =
    likeMutation.isLoading ||
    deleteMutation.isLoading ||
    isSingleFavoriteLoading

  return {
    like,
    dislike,
    isLiked,
    isLoading,
  }
}
