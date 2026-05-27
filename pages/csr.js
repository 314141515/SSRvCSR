import Navbar from '../components/Navbar'
import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'
import { CartContext } from './_app'

export default function CSRPage() {
  const { setCart } = useContext(CartContext)
  const [drinks, setDrinks] = useState([])
  const [timestamp, setTimestamp] = useState(null)
  const [loading, setLoading] = useState(true)

  const addToCart = (drink) => {
  setCart(prev => [...prev, drink])
}

  useEffect(() => {
    setTimeout(() => {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito')
        .then(res => res.json())
        .then(data => {
          setDrinks(data.drinks.slice(0, 6))
          setTimestamp(new Date().toLocaleTimeString('da-DK'))
          setLoading(false)
        })
    }, 1500)
  }, [])

  if (loading) return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">Client Side Rendering</h1>
        </div>
        <p className="hero-text">
          Et øjeblik
        </p>
        <p className="loading">Loading...</p>
      </div>
    </>
  )

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">Client Side Rendering</h1>
        </div>
        <p className="hero-text">
          Kl. {timestamp}
        </p>

        <div className="panel">
          {drinks.map(drink => (
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
        </div>
      </div>
    </>
  )
}