import { Link, Outlet } from 'react-router-dom'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/saved" className="nav-link">Saved Lists</Link>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout 