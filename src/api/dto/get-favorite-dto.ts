export type GetFavoriteDto = FavoriteItem[]

interface FavoriteItem {
  id: number
  user_id: string
  image_id: string
  sub_id: string
  created_at: string
  image: Image
}

interface Image {
  id: string
  url: string
}
