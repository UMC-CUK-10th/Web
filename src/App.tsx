import './App.css';
import CartList from './components/CartList';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import PriceBox from './components/PriceBox';
import { useSelector } from './hooks/useCustomRedux';
import store from './store/store';
import { Provider } from 'react-redux';

function AppContent() {
  const { isOpen } = useSelector((state) => state.modal);

  return (
    <>
      <Navbar />
      <CartList />
      <PriceBox />
      {isOpen && <Modal />}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
