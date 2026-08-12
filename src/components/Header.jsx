import { Link } from 'react-router-dom'
import Navigation from './Navigation.jsx'

function Header() {
  return (
    <header className="site-header">
      <Link className="site-logo" to="/">
        Japan Travel Guide
      </Link>
      <Navigation />
    </header>
  )
}

export default Header
