import React, { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import db from '../../db/db'


const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const {category} = useParams()
  
  useEffect(()=>{
    let consulta;
    let productosRef = collection(db, "productos")

    if(category){
      //Filtrar data
      consulta = query( productosRef, where("category" , "==", category) )
    }else{
      //Devuelve todos los productos
      consulta = productosRef
    }
      getDocs(consulta)
      .then((respuesta)=>{
        let productosDb = respuesta.docs.map((producto)=>{
          return { id : producto.id, ...producto.data() }
        })
        setProducts(productosDb)
      })
      .catch((error)=> console.log(error))
  }, [category])
  


  
  return (
    <>
      <ItemList products={products} category = {category}/>
    </>
  )
}

export default ItemListContainer