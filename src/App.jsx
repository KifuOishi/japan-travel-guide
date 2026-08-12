import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import AttractionDetail from './pages/AttractionDetail.jsx'
import Favorites from './pages/Favorites.jsx'
import Home from './pages/Home.jsx'
import Region from './pages/Region.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/region/:regionName" element={<Region />} />
          <Route path="/attraction/:attractionId" element={<AttractionDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
