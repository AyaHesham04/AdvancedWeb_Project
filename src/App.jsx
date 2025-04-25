/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes } from "react-router-dom";
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
import AdminAllOrdersPage from "./Page/Admin/AdminAllOrdersPage.jsx";
import AllCategoryPage from "./Page/Category/AllCategoryPage.jsx";
import AllProductsPage from "./Page/Products/AllProductsPage.jsx";
import AdminAllProductsPage from "./Page/Admin/AdminAllProductsPage.jsx";
import AdminEditProductsPage from "./Page/Admin/AdminEditProductsPage.jsx";
import ProtectedRoute from "./Components/Uitily/ProtectedRoute.jsx";
import AdminAllCategoriesPage from "./Page/Admin/AdminAllCategoriesPage.jsx";
import AdminAddProductsPage from "./Page/Admin/AdminAddProductsPage.jsx";
import AdminAddCategoryPage from "./Page/Admin/AdminAddCategoryPage.jsx";
import AdminAnalyticsPage from "./Page/Admin/AdminAnalyticsPage.jsx";
import AdminAddCouponPage from "./Page/Admin/AdminAddCouponPage.jsx";
import AdminSliderPage from "./Page/Admin/AdminSliderPage.jsx";
import OrderSuccessPage from "./Page/Order/OrderSuccessPage.jsx";
import AdminEditCategoryPage from "./Page/Admin/AdminEditCategoryPage.jsx";



function App() {
  return (
    <div className="font"  >
      <NavBarLogin />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/allcategory" element={<AllCategoryPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/products/category/:id" element={<ProductsByCategory />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminAnalyticsPage />} />
          <Route path="/admin/all_orders" element={<AdminAllOrdersPage />} />
          <Route path="/admin/all_products" element={<AdminAllProductsPage />} />
          <Route path="/admin/add/product" element={<AdminAddProductsPage />} />
          <Route path="/admin/edit/product/:id" element={<AdminEditProductsPage />} />
          <Route path="/admin/edit/category/:id" element={<AdminEditCategoryPage />} />
          <Route path="/admin/all_categories" element={<AdminAllCategoriesPage />} />
          <Route path="/admin/add/category" element={<AdminAddCategoryPage />} />
          <Route path="/admin/add/coupon" element={<AdminAddCouponPage />} />
          <Route path="/admin/slider" element={<AdminSliderPage />} />
        </Route>
      </Routes>
      <Footer />

    </div>

  )
}

export default App
