import React, { useState } from 'react'
import FormCheckout from './FormCheckout'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'
import { toast } from 'react-toastify';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore'
import db from '../../db/db'
import "./checkout.css"
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const [datosForm, setDatosForm] = useState({
        name : "",
        email : "",
        repetir_email : "",
        phone : "",
    })
    const [idOrder, setIdOrder] = useState(null)

    const { carrito, totalPrice, deleteAll } = useContext(CartContext)

    const saveInputData = (event) =>{
        setDatosForm( { ...datosForm, [event.target.name] : event.target.value } )
    }


    const sendOrder = (event) =>{
        event.preventDefault()
        const fecha = new Date()
        fecha.toLocaleDateString()
        //Formato de la orden
        const order = {
            comprador : { ...datosForm },
            productos : [...carrito],
            fecha : fecha,
            total : totalPrice(),
        }
        //Comparacion de emails para que sean iguales
        if(datosForm.email != datosForm.repetir_email){
            const notify = () => {
                toast.error("The email fields do not match", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            };
            notify()
            return
        }


        //Subir la orden a firebase
        const ordersRef = collection(db, "ordenes")
        addDoc(ordersRef, order)
        .then((respuesta)=>{
            //Se borran los datos de los input
            {setDatosForm({
                name : "",
                email : "",
                phone : ""
            })}
            //Guardar el ID de la orden en una variable de estado
            setIdOrder(respuesta.id)
            //Borrar el carrito cuando se hace la orden
            deleteAll()
        })
        .catch((err)=>{console.log(err)})
        
        //Actualizar el stock en la base de datos
        const productoRef = collection(db, "productos")
        getDocs(productoRef)
        .then((respuesta)=>{
            let productosDb = respuesta.docs.map((producto)=>{
                return { id : producto.id, ...producto.data() }
            })
            productosDb.forEach((productoDb)=>{
                carrito.forEach((productoCarrito)=>{
                    if(productoDb.name === productoCarrito.name){
                        const newStockValue = productoDb.stock - productoCarrito.cantidad;
                        const productoDocRef = doc(db, "productos", productoDb.id);
                        updateDoc(productoDocRef, { stock: newStockValue })
                    }
                })
 
            })
        })
    }

  return (
    <div className='main__section__checkout'>
        {idOrder ? <div>
            <h2>Thanks for buying with us</h2>
            <p>Order ID : {idOrder}</p>
            <img src="/src/assets/daniel-riccardo.gif" alt="" />
        </div> : 
        <FormCheckout datosForm = {datosForm} saveInputData = {saveInputData} sendOrder = {sendOrder}/>
        }
    </div>
  )
}

export default Checkout