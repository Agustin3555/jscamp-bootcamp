import './App.css'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Header } from './components/Header/Header.tsx'
import { Footer } from './components/Footer/Footer.tsx'
import { Loader } from './components/Loader/Loader.tsx'

const Home = lazy(() => import('./pages/Home/Home.tsx'))
const Search = lazy(() => import('./pages/Search/Search.tsx'))
const Detail = lazy(() => import('./pages/Detail/Detail.tsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.tsx'))

export const App = () => (
  <div className="cmp-app">
    <Header />
    <Suspense fallback={<Loader size="l" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/jobs/:jobId" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <Footer />
  </div>
)
