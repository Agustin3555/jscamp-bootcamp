import './App.css'
import { useRouter } from './hooks/useRouter.ts'
import { Header } from './components/Header/Header.tsx'
import { Footer } from './components/Footer/Footer.tsx'
import { Route } from './components/Route/Route.tsx'
import Home from './pages/Home/Home.tsx'
import Search from './pages/Search/Search.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'

const VALID_PATHS = ['/', '/search']

export const App = () => {
  const { currentPath } = useRouter()

  const isValidPath = VALID_PATHS.includes(currentPath)

  return (
    <div className="cmp-app">
      <Header />
      {isValidPath ? (
        <>
          <Route path="/" component={<Home />} />
          <Route path="/search" component={<Search />} />
        </>
      ) : (
        <NotFound />
      )}
      <Footer />
    </div>
  )
}
