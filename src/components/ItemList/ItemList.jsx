import React from 'react'
import Item from './Item'
import "./Itemlist.css"

const ItemList = ({products, category}) => {
  return (
    <section className='main__section__shop'>
      <h1>{category ? category : "Products"}</h1>
      <div className='shop__card__box'>
          {products.map(producto =>  
          <Item key={producto.id} producto = {producto}/>
          )}
      </div>
    </section>
  )
}

export default ItemList