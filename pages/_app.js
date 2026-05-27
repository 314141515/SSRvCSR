import '@/styles/globals.css'
import { Jost } from 'next/font/google'
import { useState } from 'react'
import { createContext } from 'react';

const jost = Jost({ subsets: ['latin'] })

export const CartContext = createContext();

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <main className={jost.className}>
        <Component {...pageProps} />
      </main>
    </CartContext.Provider>
  )
}