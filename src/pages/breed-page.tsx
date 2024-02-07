import { Button, Spinner } from 'flowbite-react'
import { useBreedData } from '../api/use-breed-data.hook'
import { useSearchParams } from 'react-router-dom'

const BreedPage = () => {
  const { data, isLoading } = useBreedData()
  const [searchParams, setSearchParams] = useSearchParams()

  if (isLoading)
    return (
      <div className="text-center">
        <Spinner color="purple" aria-label="Center-aligned" size="xl" />
      </div>
    )

  if (!data) return <div>No breeds....</div>

  const handleBreedButton = (breedId: string) => {
    setSearchParams((prev) => ({
      ...prev,
      breed: breedId,
    }))
  }

  return (
    <div className="flex flex-wrap gap-4">
      {data.map((breed) => (
        <Button
          key={breed.id}
          onClick={() => handleBreedButton(breed.id)}
          outline
          gradientDuoTone="purpleToBlue"
        >
          {breed.name}
        </Button>
      ))}
    </div>
  )
}

export default BreedPage
