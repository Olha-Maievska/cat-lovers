import { Button, Card } from 'flowbite-react'
import { FC, MouseEventHandler } from 'react'
import { useSearchParams } from 'react-router-dom'

interface CatCardProps {
  image: string
  name: string
  catId: string
}

export const CatCard: FC<CatCardProps> = ({ image, name, catId }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setCatParams: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault()

    setSearchParams({
      cat: catId,
    })
  }

  return (
    <Card className="w-72" onClick={setCatParams}>
      <img
        src={image}
        alt={name}
        style={{ width: '100%', height: 230, objectFit: 'cover' }}
      />

      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {name}
      </h5>
      <Button gradientDuoTone="purpleToBlue">Read more</Button>
    </Card>
  )
}
