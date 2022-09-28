import './CartScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//Components
import CartItem from '../components/cartItem'
//Action
import { addToCart, removeFromCart } from '../redux/actions/cartActions'

const CartScreen = () => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const qtyChangeHadler = (id, qty) => {
    dispatch(addToCart(id, qty))
  }
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2)
  }

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }
  return (
    <>
      <div className="mt-3"></div>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/items">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHadler={qtyChangeHadler}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>$ {getCartSubTotal()}</p>
          </div>
          <div>
            <button>Checkout</button>
          </div>
        </div>
      </div>
      <button className=" back btn btn-outline-dark mt-3 justify-content-center align-items-center text-center">
        <Link to="/item"> Keep Shopping</Link>
      </button>
    </>
  )
}

export default CartScreen
