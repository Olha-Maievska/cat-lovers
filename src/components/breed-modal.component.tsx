import { Button, Carousel, Modal } from 'flowbite-react'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSingleCatDataHook } from '../api/use-single-cat-data-hook'
import { useLikeApi } from '../api/use-like-api.hook'
import { Link } from 'react-router-dom'
import { filterSearchParams } from '../utils/search-params'
import { useRandomData } from '../api/use-random-cat-data.hook'

interface BreedModalProps {}

const BreedModalComponent: FC<BreedModalProps> = () => {
  const [openModal, setOpenModal] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const breed = searchParams.get('breed')
  const { data, isLoading } = useRandomData({ breedId: breed })

  useEffect(() => {
    setOpenModal(!!breed)
  }, [breed])

  const closeModal = () => {
    const paramsObject = filterSearchParams(searchParams, 'breed')
    setSearchParams(paramsObject)
  }

  const handleClick = (catId: string) => {
    setSearchParams((prev) => ({
      ...prev,
      cat: catId,
    }))
  }

  return (
    <>
      <Modal
        size="xl"
        position={'center'}
        show={openModal}
        onClose={closeModal}
      >
        <Modal.Header>
          <div className="font-bold text-2xl">
            {isLoading
              ? 'Loading...'
              : data?.pages[0][0].breeds?.map((b) => b.name).join(',') ||
                'Cute kitty'}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slide={false}>
              {data?.pages.map((page) => {
                return page.map((cat) => (
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    src={cat.url}
                    alt={cat.id}
                    key={cat.id}
                    onClick={() => handleClick(cat.id)}
                  />
                ))
              })}
            </Carousel>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default BreedModalComponent
