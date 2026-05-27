import Navbar from '../components/Navbar'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext } from './_app'

export default function SSRPage({ drinks, timestamp }) {
  const { setCart } = useContext(CartContext)

  const addToCart = (drink) => {
    setCart(prev => [...prev, drink])
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">Server Side Rendering</h1>
        </div>
        <p className="hero-text">
          Kl. {timestamp}.
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

export async function getServerSideProps() {
  const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  const data = await res.json()
  const timestamp = new Date().toLocaleTimeString('da-DK')

  return {
    props: {
      drinks: data.drinks.slice(0, 6),
      timestamp
    }
  }
}