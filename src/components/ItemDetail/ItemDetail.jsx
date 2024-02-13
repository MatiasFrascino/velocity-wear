import React, { useContext, useState, useEffect } from 'react'
import "./ItemDetail.css"
import ItemCount from '../ItemCount/itemCount'
import { Link } from "react-router-dom"
import { CartContext } from '../../context/CartContext'

const ItemDetail = ({data, checkSize}) => {

  const [toggle, setToggle] = useState(false)
  const [isSizeSelected, setIsSizeSelected] = useState(false)
  const [amount, setAmount] = useState(1)
  const [stock, setStock] = useState(data.stock)
  const [selectedSize, setSelectedSize] = useState()
  //Importamos la funcion cart context y que contexto queremos utilizar
  const { addProductToCart, updatedStock } = useContext(CartContext)


  useEffect(()=>{
    if(data){
      setStock(updatedStock(data))
      if(data.stock === 0){
        setToggle(true)
      }
    }
  }, [data])

  //Recibe el talle que el usuario selecciona, lo guarda en la variable de estado y guarda tambien el stock
  const sizePerProduct = (talle)=> {
    setSelectedSize(talle)
    setStock(updatedStock(data))
  }

  //Recibe el contador, verifica si el talle seleccionado es true y manda el producto al carrito
  const addProduct = (contador) =>{
    if(selectedSize === undefined){
      setIsSizeSelected(true)
    } else {
      setIsSizeSelected(false)
      setToggle(true)
      const productoEnCarrito = {...data, cantidad: contador, selectedSize : selectedSize, id : data.id + selectedSize}
      addProductToCart(productoEnCarrito)
    }
  }

  //Recibe la cantidad actualizada del contador en cada click y la guarda
  const updatedPrice = (contador)=>{
    setAmount(contador)
  }

  //Toma la cantidad guardada en cada click y muestra el precio segun la cantidad seleccionada
  const updatedValue = () =>{
    const precio = data.price * amount
    return precio
  }

  return (
    <section className='main__section__shop'>
        <h2>{data.name}</h2>
        <div className='details__box'>
          <img className='details__box__img' src={data.image} alt="" />
          <div className='details__box__aside'>
            <h3 className='details__box__title'>Size:</h3>
            <div>
              <button className='details__box__size' onClick={()=> sizePerProduct("S")} disabled={!checkSize("S")}>S</button>
              <button className='details__box__size' onClick={()=> sizePerProduct("M")} disabled={!checkSize("M")}>M</button>
              <button className='details__box__size' onClick={()=> sizePerProduct("L")} disabled={!checkSize("L")}>L</button>
              <button className='details__box__size' onClick={()=> sizePerProduct("XL")} disabled={!checkSize("XL")}>XL</button>
            </div>
            <h3 className='details__box__title'>Description:</h3>
            <p className='details__box__paragraph'>{data.description}</p>
            <h3 className='details__box__title'>Price: ${updatedValue()}</h3>
            {toggle ? (
            <div>
              <Link className='cartSummaryButton' to={"/carrito"}>Go to Cart</Link>
              <Link className='cartSummaryButton' to={"/checkout"}>Checkout</Link>
            </div>
            )
            : 
            (<ItemCount 
            stock = {stock ? stock : (stock === 0 ? setToggle(true) : data.stock)} 
            addProduct = {addProduct} 
            updatedPrice = {updatedPrice}
            />
            )}
            {isSizeSelected === true ? <p>You must select a size</p> : ""}
          </div>
        </div>
    </section>
  )
}

export default ItemDetail