import React from 'react';
import AllRoutes from './AllRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {

  return (
    <div className="h-screen">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
