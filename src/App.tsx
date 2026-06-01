import './App.css'
import CartList from './componants/cartList'
import BottomBar from './componants/BottomBar'
import ConfirmModal from './componants/ConfirmModal'

// mission 9.1

export default function App() {
  return (
    <div className='
      flex flex-col item-center justify-center text-center gap-10
      w-full min-h-screen px-50 py-20
    '>
      <h1 className='text-4xl font-bold text-blue-500'>
        플레이리스트
      </h1>
      <CartList/>
      <BottomBar />
      <ConfirmModal />
    </div>
  )
}