import { Link } from 'react-router-dom'

import './css/items.css'
import '../screens/ItemScreen'

const Items = ({ imageUrl, description, price, name, productId }) => {
  return (
    <>
      <div className="row w-auto p-2 m-2-auto">
        <div className="col">
          <div className="card text-center w-50 justify-content-center text-center">
            <img
              src={imageUrl}
              className="card-img-top w-50 justify-content-center text-center"
              alt={name}
            />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{description}</p>
              <h2 className="card-text">${price}</h2>

              <div className="m-2 p-3">
                <Link to={'#'}></Link>
                <Link to={`/product/${productId}`}>
                  <button
                    type="button"
                    className="btn btn-outline-dark text-center justify-content-center"
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Items
