import { FC } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <div className="flex justify-between items-end mb-6">
      <Link to="/" className="text-white font-extrabold sm:text-4xl text-xl">
        Cat Lovers
      </Link>
      <div className="sm:text-lg text-sm font-semibold leading-6">
        <Link to="/" className="mr-3 sm:mr-6 text-purple-800">
          Home
        </Link>
        <Link to="/breed" className="mr-3 sm:mr-6 text-purple-800">
          Breed
        </Link>
        <Link to="/favorite" className="text-purple-800">
          Favorite
        </Link>
      </div>
    </div>
  )
}
