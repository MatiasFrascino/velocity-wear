import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import "./Carrito.css"
import { Link } from 'react-router-dom'

const Carrito = () => {
  const { carrito, sumarCantidad, restarCantidad, totalPrice, deleteAll } = useContext(CartContext)

  if(carrito.length === 0){
    return (
      <div className='carrito__box'>
        <p className='emtpy__title'>Your cart is empty Cart</p>
        <img className='empty-gif' src="/src/assets/ocon-gif.gif" alt="" />
        <Link className='cartSummaryButton' to={"/"}>Back home</Link>
      </div>
    )
  }

  return (
    <ul className='carrito__box'>
      <h1>Summary</h1>
      {carrito.map((producto) => (<li className='carrito__box__items' key={producto.id}>
        <aside>
          <img className='carrito__box__items__img' src={producto.image} alt="" />
        </aside>
        <div className='carrito__box__items__details'>
          <h3 className='carrito__box__items__title'>{producto.name}</h3>
          <h3 className='carrito__box__items__details'>Size : {producto.selectedSize}</h3>
          <div className='carrito__box__items__counter'>
            <button onClick={()=>{restarCantidad(producto)}}  className='counter__box__button'>-</button>
              <p>{producto.cantidad}</p>
            <button onClick={()=>{sumarCantidad(producto)}} className='counter__box__button'>+</button>
          </div>
          <h3 className='carrito__box__items__title'>Total: ${producto.price * producto.cantidad}</h3>
        </div>
      </li>))}
      <h3 className='price'>Total Price: ${totalPrice()}</h3>
      <button className='cartSummaryButton' onClick={deleteAll}>Delete all</button>
      <Link className='cartSummaryButton' to={"/checkout"}>Checkout</Link>
    </ul>
  )
}

export default Carrito