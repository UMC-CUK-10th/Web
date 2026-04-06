import './App.css';
import { Link, Route, Routes } from './Router';


const JunPage = () => <h1>주은 페이지</h1>;
const MongPage = () => <h1>몽 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style = {{ display: 'flex' , gap : '10px'}}>
      <Link to='/jun'>JUN</Link>
      <Link to='/mong'>MONG</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/jun' component={JunPage} />
        <Route path='/mong' component={MongPage} />
        <Route path='/not-found' component={NotFoundPage}/>
      </Routes>
    </>
  );
}

export default App;