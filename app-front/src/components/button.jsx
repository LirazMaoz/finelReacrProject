import { Link } from 'react-router-dom'
import './css/button.css'
const Button = () => {
  return (
    <div className="justify-content-center text-center">
      <Link to="/items">
        <button className="btn btn btn-outline-secondary">Shop Now</button>
      </Link>
    </div>
  )
}

export default Button
