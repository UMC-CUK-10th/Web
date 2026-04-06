import { ThemeProvider } from './06-useContext/context/ThemeProvider';
import Navbar from './06-useContext/Navbar';
import ThemeContent from './06-useContext/context/ThemeContent';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ThemeContent />
      </div>
    </ThemeProvider>
  );
}

export default App;
