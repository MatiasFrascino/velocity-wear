import './App.css'
import AboutUs from './components/AboutUs/AboutUs'
import Carrito from './components/Carrito/Carrito'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import MainPage from './components/MainPage/MainPage'
import Navbar from './components/NavBar/Navbar'
import Checkout from './components/Checkout/Checkout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { CartProvider } from './context/CartContext'


function App() {
  

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar/>
        <ToastContainer/> 
        <Routes>
          <Route path='/' element = {<MainPage/>} />
          <Route path='/aboutus' element = {<AboutUs/>}/>
          <Route path='/itemlist' element = {<ItemListContainer/>}/>
          <Route path='/details/:id' element = {<ItemDetailContainer/>}/>
          <Route path='categories/:category' element = {<ItemListContainer/>} />
          <Route path='/carrito' element = {<Carrito/>}/>
          <Route path='checkout' element = { <Checkout/> }/>
          <Route path = '*' element = {<div className='main__section'><h2>404 Page not found</h2></div>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>     
  )
}

export default App
