import useCartStore from '../zustandStore'
import CartItem from './cartItem'

export default function CartList() {
  const { items } = useCartStore()

  return (
    <div className="flex flex-col gap-2 p-4">
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  )
}