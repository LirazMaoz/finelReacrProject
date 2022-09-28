import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './css/navbar.css'

const NavBar = ({ user }) => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  return (
    <nav
      className="navbar navbar-expand-sm navbar-light  text-dark shadow-sm"
      aria-label="Third navbar example"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span>
            Shop <i className="bi bi-suit-heart"></i> Now
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart2"></i>
                <span>{getCartCount()}</span>
              </Link>
            </li>

            {user?.biz && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-cards">
                  My Cards
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Sign Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup-biz">
                    VIP Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
