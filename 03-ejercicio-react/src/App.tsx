import './App.css'
import { Header } from './components/Header/Header.tsx'
import { Footer } from './components/Footer/Footer.tsx'
import { Route } from './components/Route/Route.tsx'
import Home from './pages/Home/Home.tsx'
import Search from './pages/Search/Search.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'

export const App = () => (
  <div className="cmp-app">
    <Header />
    <Route path="/" component={<Home />} />
    <Route path="/search" component={<Search />} />
    <Route path="/*" component={<NotFound />} />
    <Footer />
  </div>
)
