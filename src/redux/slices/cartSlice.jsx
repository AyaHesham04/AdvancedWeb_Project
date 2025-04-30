// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    items: JSON.parse(Cookies.get('cart') || '[]'),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { productId } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ productId, quantity: 1 });
            }

            Cookies.set('cart', JSON.stringify(state.items), { expires: 7 });
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item.productId === productId);
            if (item) {
                item.quantity = quantity;
                Cookies.set('cart', JSON.stringify(state.items), { expires: 7 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
            Cookies.set('cart', JSON.stringify(state.items), { expires: 7 });
        },
        setCart: (state, action) => {
            state.items = action.payload;
            Cookies.set('cart', JSON.stringify(state.items), { expires: 7 });
        },
        clearCart: (state) => {
            state.items = [];
            Cookies.set('cart', JSON.stringify([]), { expires: 7 });
        }
    },
});

// Export the new action too
export const { addToCart, updateQuantity, removeFromCart, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
