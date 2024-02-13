import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Creacion del contexto de React llamado CartContext
const CartContext = createContext()

const CartProvider = ({children}) =>{

    const [carrito, setCarrito] = useState([])

    //Funcion que evalua si el producto esta en carrito
    const isOnCart = (idProduct) =>{
        //Esto evalua una condicion que si se cumple devuelve true, sino devuelve false
        const respuesta = carrito.some((producto) => producto.id === idProduct)
        return respuesta
    }

    //Si el producto no esta en el carrito lo agrega y si esta, suma la cantidad
    const addProductToCart = (newProduct)=>{
        const condicion = isOnCart(newProduct.id)
        if(condicion){
           const productosModificados = carrito.map((producto)=>{
            if(producto.id === newProduct.id){
                return { ...producto, cantidad: producto.cantidad + newProduct.cantidad }
            } else {
                //Si el id no matchea, devolvemos el producto tal cual
                return producto
            }
           })
           setCarrito(productosModificados)
        } else {
            setCarrito([...carrito, newProduct])
        }
    }
    //Muestra la cantidad total de productos en el carrito en el componenete CartWidget
    const cantidadTotal = () =>{
        const cantidad = carrito.reduce((total, producto)=> total + producto.cantidad, 0)
        return cantidad
    }
    //Suma la cantidad del producto con cada click hasta acabar stock
    const sumarCantidad = (producto) =>{
        const productoEncontrado = obtenerProductoEnCarrito(producto);
        const cantidadTotalEnCarrito = productoEncontrado.reduce((total, productoCarrito) => total + productoCarrito.cantidad, 0);
        if(cantidadTotalEnCarrito < producto.stock){
            const cantidadAumentada = carrito.map((product)=>{
                if(product.id === producto.id){
                    const masCantidad = producto.cantidad + 1
                    return { ...producto, cantidad: masCantidad }
                }
                return product;
            })
            setCarrito(cantidadAumentada)
        } else {
            const notify = () => {
                toast.error("Out of stock", {
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
        }
    }
    //Resta la cantidad del producto con cada click y cuando va por debajo de 1 unidad elimina el producto del carrito
    const restarCantidad = (producto) =>{
        if(producto.cantidad > 1){
            const cantidadDisminuida = carrito.map((product)=>{
                if(product.id === producto.id){
                    const menosCantidad = producto.cantidad - 1
                    return { ...producto, cantidad: menosCantidad }
                }
                return product;
            })
            setCarrito(cantidadDisminuida)
        } else {
            const index = carrito.findIndex((product) => product.id === producto.id);
            if (index !== -1) {
                carrito.splice(index, 1); // Elimina el elemento en la posición 'index'
                setCarrito([...carrito]); // Actualiza el estado del carrito
                const notify = () => {
                    toast.success("Product deleted succesfuly", {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                };
                notify()
            }
        }   
    }
    //Compara el stock viejo con el stock nuevo y me devuelve la diferencia para saber cuanto stock queda realmente
    const updatedStock = (producto)=>{
        let newStock;
        const condicion = isOnCartStock(producto.name);
        const productoEncontrado = obtenerProductoEnCarrito(producto);
        if (condicion) {
            if(productoEncontrado.length > 0){
                const cantidadTotalEnCarrito = productoEncontrado.reduce((total, productoCarrito) => total + productoCarrito.cantidad, 0);
                newStock = producto.stock - cantidadTotalEnCarrito;
                return newStock
            }
        }
    }
    //Busca el producto de la funcion updatedStock en el carrito y lo devuelve
    const obtenerProductoEnCarrito = (producto) => {
        return carrito.filter(
          (productoCarrito) => (productoCarrito.name === producto.name) 
        );
    };
    //Funcion que evalua si el producto esta en carrito pasandole como parametro el nombre. Relacionado a la funcion updatedStock
    const isOnCartStock = (name) =>{
        //Esto evalua una condicion que si se cumple devuelve true, sino devuelve false
        const respuesta = carrito.some((producto) => producto.name === name)
        return respuesta
    }
    //Suma para el precio total
    const totalPrice = () =>{
        const total = carrito.reduce((total, producto)=> total + (producto.price * producto.cantidad), 0)
        return total
    }
    //Borra todos los elementos del carrito
    const deleteAll = () =>{
        setCarrito([])
    }

    //Todo lo que pasemos dentro de value, es lo que va a estar disponible dentro de los componentes que esten dentro de children. Con doble llave enviamos un objeto
    return(
        <CartContext.Provider value={{carrito, addProductToCart, cantidadTotal, sumarCantidad, restarCantidad, updatedStock, totalPrice, deleteAll}}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }