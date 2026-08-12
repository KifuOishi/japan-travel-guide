import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
    </nav>
  )
}

export default Navigation
