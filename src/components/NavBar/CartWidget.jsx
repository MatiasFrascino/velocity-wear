import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import {Link} from 'react-router-dom'

const CartWidget = () => {

    const { cantidadTotal } = useContext(CartContext) 
  return (
    <Link to={"/carrito"} className='cart__widget__box'>
        <img className='icon' src="/src/assets/cart.png" alt="" />
        <p>{
        cantidadTotal() != 0 ? cantidadTotal() : ""
        }</p>
    </Link>
  )
}

export default CartWidget