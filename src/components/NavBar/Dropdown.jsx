import React from 'react'
import { Link } from "react-router-dom"
import "./NavBar.css"

const Dropdown = ({onItemClick}) => {
    const categories = ['jackets', 'caps', 'shirts']
  return (
    <ul className="dropdown" onMouseLeave={onItemClick}>
      {categories.map((category, index)=>(<Link onClick={onItemClick} className='dropdown__list' to={`/categories/${category}`} key={index}>{category}</Link>))}
    </ul>
  );
}

export default Dropdown