// App.tsx 또는 CartList.tsx
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import CartItem from './cartItem'

export default function CartList() {
  const items = useSelector((state: RootState) => state.cart.items)

  return (
    <div className="flex flex-col gap-2 p-4">
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  )
}