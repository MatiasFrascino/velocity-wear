import React from 'react'
import Star from '../Extras/Star'
import "./MainPage.css"
import { Link } from "react-router-dom"


const MainPage = () => {
  return (
    <>
        <section className='main__section'>
            <div className='main__section__box'>
                <h1>Gear Up for the Fast Lane</h1>
                <p>Max Verstappen Jacket 2023 </p>
                <h2 className='main__section__price'>$120</h2>
                <Star starsNumber="5"/>
                <p className='mainParagraph'>Introducing the Max Verstappen Jacket 2023, a sleek blend of style and speed. Designed for true F1 enthusiasts, this jacket captures the essence of Max Verstappen's racing prowess</p>
                <Link to={"/itemlist"} className='purchaseButtonMain'>View More</Link>
                </div>
            <aside>
                <img className='main__section__img' src="/src/assets/max-verstappen.png" alt="" />
            </aside>
        </section>
    </>
  )
}

export default MainPage