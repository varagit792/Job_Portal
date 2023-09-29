import React from 'react';
import AllRoutes from './AllRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useLocation } from 'react-router';

const App = () => {
  const location = useLocation();

  return (
    <div className="h-screen">
     { location?.pathname !== "/registration" && <Header />}
      <AllRoutes />
      { location?.pathname !== "/registration" && <Header />}
    </div>
  );
}

export default App;
