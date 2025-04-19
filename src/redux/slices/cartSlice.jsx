// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';


export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${APP_URL}/cart`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to load cart');
    }
});
export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${APP_URL}/cart/${id}`);
            return { id };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete cart item');
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
    reducers: {},
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
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload.id);
            });

    },
});

export default cartSlice.reducer;
