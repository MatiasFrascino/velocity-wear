import React, { useEffect, useState } from 'react'
import "./ItemCount.css"

const ItemCount = ({stock, addProduct, updatedPrice}) => {
    const [contador, setContador] = useState(1)


    const sumar = () =>{
        if(contador < stock){
            setContador(contador + 1)
        }
    }

    const restar = () =>{
        if(contador > 1){
            setContador(contador - 1)
        }
    }

    useEffect(()=>{
        updatedPrice(contador)
    }, [contador])
  return (
    <div className='counter__box'>
        <div className='counter__box__counter'>
            <button className='counter__box__button' onClick={restar}>-</button>
            <p>{contador}</p>
            <button className='counter__box__button' onClick={sumar}>+</button>
        </div>
        <button onClick={()=>{addProduct(contador)}} className='purchaseButton'>ADD TO CART</button>
    </div>
  )
}

export default ItemCount