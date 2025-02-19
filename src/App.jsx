import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/shared/Navbar';
import Footer from './sections/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-68px-52px)]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}

export default App;
