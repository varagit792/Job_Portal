import React, { useEffect } from 'react';
import AllRoutes from './AllRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useLocation } from 'react-router';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  }, [location])
  
  return (
    <div className="h-screen">
      {location?.pathname !== "/registration" && <Header />}
      <AllRoutes />
      {location?.pathname !== "/registration" && <Footer />}
    </div>
  );
}

export default App;
