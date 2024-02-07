import { FC } from 'react'
import { HomePage } from './pages/home.page'
import ModalComponent from './components/cat-modal.component'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BreedPage from './pages/breed-page'
import BreedModalComponent from './components/breed-modal.component'
import { Header } from './components/header.compnents'
import FavoritePage from './pages/favorite-page'

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div className="py-6 px-4 sm:px-12 lg:container mx-auto">
      <BrowserRouter>
        <ModalComponent />
        <BreedModalComponent />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/breed" element={<BreedPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
