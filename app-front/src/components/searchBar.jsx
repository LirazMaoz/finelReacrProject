import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import product from 'products'
import './css/searchBar.css'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <input
        className="form-control w-100 mt-3 mb-3"
        type="search"
        placeholder="What Are U Looking For?"
        aria-label="Search"
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
      />

      {product

        .filter((val) => {
          if (searchTerm.length === '') {
            return val
          } else if (
            val.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val
          }
        })

        .map((product, key) => {
          if (searchTerm.length > 0) {
            return (
              <div className="name" key={key}>
                <div className="search">
                  <NavLink to={`/product/${product.id}`}>
                    {product.name}
                  </NavLink>
                </div>
              </div>
            )
          }
        })}
    </>
  )
}

export default SearchBar
