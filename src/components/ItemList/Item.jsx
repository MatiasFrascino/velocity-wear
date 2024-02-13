import React from 'react'
import { Link } from 'react-router-dom'

const Item = React.memo(({producto}) => {

  return (
    <article className='shop__card' key={producto.id}>
        <img className='shop__card__img' src={producto.image} alt="" />
        <p className='shop__card__paragraph'>{producto.name}</p>
        <h2 className='main__section__price'>${producto.price}</h2>
        <Link className='shop__card__details__button' to={`/details/${producto.id}`}>Details</Link>
    </article>   
    
)},(propsAntiguas, propsNuevas)=> JSON.stringify(propsAntiguas) === JSON.stringify(propsNuevas))

export default Item