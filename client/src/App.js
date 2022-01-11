import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/login_signup/Login';
import Signup from './components/login_signup/Signup';
import { useSelector } from 'react-redux';
import Products from './components/Products';
import Cart from './components/topbar/Cart';
import Seller from './components/topbar/Seller';
import MyProducts from './components/topbar/MyProducts';
import ProductDetail from './components/ProductDetail';
import EditProduct from './components/EditProduct';
import ProductsByCategory from './components/ProductsByCategory';
import Contact from './components/topbar/Contact';
import About from './components/topbar/About';
import { useEffect } from 'react';
import { setToken } from './components/state/action-creaters/authTokenactions';
import ErrorPage from './components/ErrorPage';


function App() {
  const authToken = useSelector(state => state.authToken);
  const nav = useSelector(state => state.navBar);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setToken(localStorage.getItem("auth-token"));
    }
  }, [authToken])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route exact path="" element={<Home />} />
            {authToken && (
              <>
                <Route exact path="myProducts" element={<MyProducts />} />
                <Route exact path="sell" element={<Seller />} />
              </>
            )
            }
            <Route exact path="allproducts" element={<Products />} />
            <Route exact path="home/cart" element={<Cart />} />
            <Route exact path="myProducts/edit/:id" element={<EditProduct />} />
            <Route exact path="product/:id" element={<ProductDetail />} />
            <Route exact path="products/:category" element={<ProductsByCategory />} />
            <Route exact path="contact" element={<Contact />} />
            <Route exact path="about" element={<About />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          {/* all unwanted routes */}
          <Route exact path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
