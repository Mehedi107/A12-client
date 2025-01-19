import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-[calc(100vh-68px-52px)]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}

export default App;
