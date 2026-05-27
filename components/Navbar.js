import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext } from '../pages/_app'

export default function Navbar() {
  const { cart } = useContext(CartContext)

  return (
    <nav>
      <span className="logo">SSR vs CSR</span>
      <div className="nav-links">
        <Link href="/">Forside</Link>
        <Link href="/ssr">SSR</Link>
        <Link href="/csr">CSR</Link>
      </div>
      <Link href="/cart" className="cart-btn">
        <Image src="/shoppingcart.png" alt="Cart" width={22} height={22} />
        {cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </Link>
    </nav>
  )
}