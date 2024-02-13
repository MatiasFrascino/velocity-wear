import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'
import { doc, getDoc } from "firebase/firestore"
import db from '../../db/db'

const ItemDetailContainer = () => {
    const [data, setData] = useState({})

    const {id} = useParams()


    useEffect(()=>{
      const productoRef = doc(db, "productos", id)
      getDoc(productoRef)
      .then((respuesta)=>{
        const productoDb = { id: respuesta.id, ...respuesta.data() }
        setData(productoDb)
      })
    }, [id])
    //Funcion para ver si el talle esta disponible en la base de datos
    const checkSize = (sizeToCheck)=>{
      if(data.size){
        return data.size.includes(sizeToCheck)
      }
    }
  return (
   <>
    <ItemDetail data={data} checkSize={checkSize}/>
   </> 
  
  )
}

export default ItemDetailContainer 