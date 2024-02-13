import React from 'react'
import { Link } from "react-router-dom"
import "./AboutUs.css"

const AboutUs = () => {
  return (
    <>
        <section className='main__section'>
          <div className='about__us__box'>
            <h1>Who are we?</h1>
            <p className='about__us__paragraph'>Welcome to Velocity Wear, where passion for Formula 1 meets fashion innovation. We are a team of dedicated enthusiasts who believe in bringing the thrilling world of F1 to your wardrobe. Our mission is to provide a curated collection of high-quality, race-inspired clothing that allows you to express your love for the sport with style.</p>
            <Link to={"/itemlist"} className='about__us__button__box'>
                <img className='about__us__button' src="/src/assets/arrow.png" alt="" />
                <h3>Explore our exclusive collection</h3>
            </Link>
          </div>
          <aside>
            <img className='about__us__img' src="/src/assets/mercedesCar.jpg" alt="" />
          </aside>
        </section>
    </>
  )
}

export default AboutUs