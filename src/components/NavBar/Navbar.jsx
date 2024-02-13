import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "./Navbar.css"
import Dropdown from './Dropdown'
import CartWidget from './CartWidget'

const Navbar = () => {

  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const handleButtonClick = () => {
    setDropdownVisible(!isDropdownVisible)
  }

  const handleDocumentInteraction = (event) => {
    if (!event.target.closest('.link__dropdown') && !event.target.closest('.dropdown') && !event.target.closest('dropdown__list')) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleDocumentInteraction);

    return () => {
      document.removeEventListener('mousemove', handleDocumentInteraction);
    };
  }, [isDropdownVisible]); 

  
  return (
    <nav>
        <Link to={"/"}><img src="/src/assets/logo.png" alt="" /></Link>
        <ul>
            <li>
              <Link to={"/"} className='link'>Home</Link>
            </li>
            <li>
              <Link to={"/aboutus"} className='link'>About Us</Link>
            </li>
            <li>
              <Link onMouseOver={handleButtonClick} className='link__dropdown' to={"/itemlist"}>Shop</Link>
              <button className='buttonDropdown' onClick={handleButtonClick}><img src="/src/assets/dropdown.png" alt="" /></button>
              {isDropdownVisible && <Dropdown onItemClick={() => setDropdownVisible(false)}/>}
            </li>
        </ul>
        <CartWidget/>
       
    </nav>
  )
}

export default Navbar