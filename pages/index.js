import Navbar from '../components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import { CartContext } from './_app'

export default function Home() {
  const { cart, setCart } = useContext(CartContext)
  const [ssrDrinks, setSsrDrinks] = useState([])
  const [csrDrinks, setCsrDrinks] = useState([])

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
      .then(res => res.json())
      .then(data => {
        setSsrDrinks(data.drinks.slice(0, 3))
        setCsrDrinks(data.drinks.slice(0, 3))
      })
  }, [])

  const addToCart = (drink) => {
    setCart(prev => [...prev, drink])
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">Cocktail A/S</h1>
        </div>
        <p className="hero-text">
          Oplev vores udvalg af cocktails med skarpe priser.
        </p>

        <div className="panels">


          <div className="panel-wrapper">
            <h2 className="panel-label">SSR</h2>
            <div className="panel">
              {ssrDrinks.map(drink => (
                <div key={drink.idDrink} className="drink-row">
                  <div className="drink-img-wrap">
                    <Image
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      width={70}
                      height={70}
                      style={{ borderRadius: '8px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="drink-divider" />
                  <div className="drink-info">
                    <span className="drink-name">{drink.strDrink.toUpperCase()}</span>
                    <button className="add-btn" onClick={() => addToCart(drink)}>+</button>
                  </div>
                </div>
              ))}
              <Link href="/ssr" className="see-more-btn">SE FLERE</Link>
            </div>
          </div>


          <div className="panel-wrapper">
            <h2 className="panel-label">CSR</h2>
            <div className="panel">
              {csrDrinks.map(drink => (
                <div key={drink.idDrink} className="drink-row">
                  <div className="drink-img-wrap">
                    <Image
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      width={70}
                      height={70}
                      style={{ borderRadius: '8px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="drink-divider" />
                  <div className="drink-info">
                    <span className="drink-name">{drink.strDrink.toUpperCase()}</span>
                    <button className="add-btn" onClick={() => addToCart(drink)}>+</button>
                  </div>
                </div>
              ))}
              <Link href="/csr" className="see-more-btn">SE FLERE</Link>
            </div>
          </div>

          
        </div>
      </div>
    </>
  )
}