import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import bestSellersReducer from "./slices/bestSellersSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import searchReducer from "./slices/searchSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    bestSellers: bestSellersReducer,
    products: productsReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
