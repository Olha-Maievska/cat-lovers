import { Button, Modal, Spinner } from 'flowbite-react'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSingleCatDataHook } from '../api/use-single-cat-data-hook'
import { useLikeApi } from '../api/use-like-api.hook'
import { filterSearchParams } from '../utils/search-params'
import { LikeFullIcon, LikeIcon, SpinnerIcon } from './icons.conponent'

interface ModalProps {}

const ModalComponent: FC<ModalProps> = () => {
  const [openModal, setOpenModal] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const cat = searchParams.get('cat')
  const { data, isLoading } = useSingleCatDataHook({ id: cat })
  const {
    like,
    dislike,
    isLiked,
    isLoading: isLikeLoading,
  } = useLikeApi({ catId: cat })

  const likeIcon = isLiked ? <LikeIcon /> : <LikeFullIcon />

  useEffect(() => {
    setOpenModal(!!cat)
  }, [cat])

  const hadleLikeButton = () => {
    if (isLiked) {
      dislike()
    } else {
      like()
    }
  }

  const closeModal = () => {
    const paramsObject = filterSearchParams(searchParams, 'cat')
    setSearchParams(paramsObject)
  }

  const handleLearMore = (breedId: string) => {
    setSearchParams({
      breed: breedId,
    })
  }

  return (
    <>
      <Modal show={openModal} onClose={closeModal}>
        <Modal.Header>
          <div className="font-bold text-2xl">
            {isLoading
              ? 'Loading...'
              : data?.breeds?.map((b) => b.name).join(',') || 'Cute kitty'}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {data?.url && (
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <Button
                    gradientDuoTone="purpleToBlue"
                    size="sm"
                    onClick={hadleLikeButton}
                  >
                    {isLikeLoading ? <SpinnerIcon /> : likeIcon}
                  </Button>
                </div>
                <img
                  src={data?.url}
                  style={{ width: '100%', height: 360, objectFit: 'cover' }}
                />
              </div>
            )}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {data?.breeds && (
                <>
                  <p className="mb-2">{data?.breeds[0].description}</p>
                  <div
                    className="text-indigo-700 hover:text-indigo-900 font-semibold text-lg cursor-pointer"
                    onClick={() =>
                      handleLearMore(data.breeds ? data.breeds[0].id : '')
                    }
                  >
                    Learn more
                  </div>
                </>
              )}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalComponent
