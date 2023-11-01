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
      {(location?.pathname !== "/registration" && location?.pathname !== "/login") && <Header />}
      <AllRoutes />
      {(location?.pathname !== "/registration" && location?.pathname !== "/login") && <Footer />}
    </div>
  );
}

export default App;
