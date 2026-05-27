import Navbar from '../components/Navbar'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext } from './_app'

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext)

  const removeOne = (id) => {
    setCart(prev => {
      const index = prev.findLastIndex(d => d.idDrink === id)
      return prev.filter((_, i) => i !== index)
    })
  }



  const grouped = cart.reduce((acc, drink) => {
    if (acc[drink.idDrink]) {
      acc[drink.idDrink].count++
    } else {
      acc[drink.idDrink] = { ...drink, count: 1 }
    }
    return acc
  }, {})


  const groupedList = Object.values(grouped)

  if (cart.length === 0) return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">Din Kurv</h1>
        </div>
        <p className="hero-text">Din kurv er tom!</p>
      </div>
    </>
  )
  

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">Din Kurv</h1>
        </div>
        <p className="hero-text">{cart.length} cocktail{cart.length !== 1 ? 's' : ''} i din kurv</p>

        <div className="panel">
          {groupedList.map((drink) => (
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
                <span className="drink-name">
                  {drink.strDrink.toUpperCase()}
                  {drink.count > 1 && (
                    <span style={{ color: '#8FD428', marginLeft: '0.5rem' }}>
                      x{drink.count}
                    </span>
                  )}
                </span>
                <button
                  className="add-btn"
                  onClick={() => removeOne(drink.idDrink)}
                  style={{ background: '#ff4444' }}>
                  −
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}