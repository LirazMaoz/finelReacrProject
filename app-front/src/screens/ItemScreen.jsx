import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Items from '../components/Items'
import SearchBar from '../components/searchBar'

//Actions
import { getProducts as listProducts } from '../redux/actions/productActions'

const ItemScreen = () => {
  const dispatch = useDispatch()

  const getProducts = useSelector((state) => state.getProducts)
  const { products, loading, error } = getProducts

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
    <SearchBar/>
      <div className="itemscreen">
        <h2 className="text-center p-3 m-3">Our New Summer Collaction!</h2>
        <div className="itemscreen__products">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            products.map((product) => (
              <Items
                key={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                productId={product._id}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ItemScreen
