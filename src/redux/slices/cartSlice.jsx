// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');

        if (token && token !== 'undefined') {
            const res = await axios.get(`${APP_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        }

        const guestCart = JSON.parse(Cookies.get('guestCart') || '[]');

        if (guestCart.length === 0) {
            return { items: [], guest: true };
        }
        const productRequests = guestCart.map(item =>
            axios.get(`${APP_URL}/products/${item.productId}`).then(res => ({
                ...res.data.data,
                quantity: item.quantity,
            }))
        );

        const cartItems = await Promise.all(productRequests);
        console.log({
            data: { cartItems: cartItems },
            totalCartPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            totalCartPriceAfterDiscount: null,
            couponName: '',
        });
        return {
            data: { cartItems: cartItems },
            totalCartPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            totalCartPriceAfterDiscount: null,
            couponName: '',
        };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to load cart');
    }
});

// Add item to cart

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            if (!token || token === "undefined") {
                // No token: Save to cookies instead
                const existingCart = JSON.parse(Cookies.get('guestCart') || '[]');

                // Check if item already exists
                const itemIndex = existingCart.findIndex(item => item.productId === productId);

                if (itemIndex !== -1) {
                    // If it exists, update quantity
                    existingCart[itemIndex].quantity += quantity;
                } else {
                    // Else, add new item
                    existingCart.push({ productId, quantity });
                }

                // Save updated cart to cookies
                Cookies.set('guestCart', JSON.stringify(existingCart), { expires: 7 }); // expires in 7 days

                toast.success('Saved to guest cart!');
                return { guestCart: existingCart }; // Optional: return something for the reducer
            }

            // If token exists: send to backend
            const res = await axios.post(
                `${APP_URL}/cart`,
                { productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Added to cart!');
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to cart');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add to cart');
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (itemId, thunkAPI) => {
        try {
            const response = await axios.delete(`${APP_URL}/cart/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete cart item');
        }
    }
);
export const applyCoupon = createAsyncThunk(
    'cart/applyCoupon',
    async (couponName, thunkAPI) => {
        try {
            const res = await axios.put(
                `${APP_URL}/cart/applyCoupon`,
                { coupon: couponName },
                {
                    headers: {
                        Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
                    },
                }
            );
            toast.success('Coupon applied!');
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid coupon');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to apply coupon');
        }
    }
);
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, thunkAPI) => {
        try {
            const res = await axios.delete(`${APP_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
                },
            });
            toast.success('Cart cleared!');
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to clear cart');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to clear cart');
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalCartPrice: 0,
        totalCartPriceAfterDiscount: 0,
        couponNameRes: '',
        loading: false,
        error: null,
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                const { data, totalCartPrice, totalCartPriceAfterDiscount, couponName } = action.payload;
                state.cartItems = data;
                state.totalCartPrice = totalCartPrice;
                state.totalCartPriceAfterDiscount = totalCartPriceAfterDiscount;
                state.couponNameRes = couponName;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                const { data, totalCartPrice, totalCartPriceAfterDiscount, couponName } = action.payload;
                state.cartItems = data;
                state.totalCartPrice = totalCartPrice;
                state.totalCartPriceAfterDiscount = totalCartPriceAfterDiscount;
                state.couponNameRes = couponName;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                const { data, totalCartPrice, totalCartPriceAfterDiscount, couponName } = action.payload;
                state.cartItems = data;
                state.totalCartPrice = totalCartPrice;
                state.totalCartPriceAfterDiscount = totalCartPriceAfterDiscount;
                state.couponNameRes = couponName;
            })
            .addCase(applyCoupon.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.cartItems = [];
                state.totalCartPrice = 0;
                state.totalCartPriceAfterDiscount = 0;
                state.couponNameRes = '';
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
            });
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            if (Array.isArray(state.cartItems)) {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            } else {
                console.error('cartItems is not an array:', state.cartItems);
            }
        });
    },

});
export const { setCartItems } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
