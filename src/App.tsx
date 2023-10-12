import { useEffect } from 'react';
import AllRoutes from './AllRoutes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useLocation } from 'react-router';
import { scrollToTop } from './components/utils/utils';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
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
