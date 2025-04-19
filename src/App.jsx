/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarLogin from "./Components/Uitily/NavBarLogin.jsx";
import Footer from "./Components/Uitily/Footer.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./Page/Home/HomePage.jsx";
import LoginPage from "./Page/Auth/LoginPage.jsx";
import ProductsByCategory from "./Page/Products/ProductsByCategory.jsx";
import RegisterPage from "./Page/Auth/RegisterPage.jsx";
import ProductDetailsPage from "./Page/Products/ProductDetailsPage.jsx";
import CartPage from "./Page/Cart/CartPage.jsx";
import SearchPage from "./Page/Home/SearchPage.jsx";

function App() {

  return (
    <div className="font" >
      <NavBarLogin />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/products/category/:id" element={<ProductsByCategory />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />

      </Routes>
      <Footer />

    </div>

  )
}

export default App
