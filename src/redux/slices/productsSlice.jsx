import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async (limit, thunkAPI) => {
        try {
            const res = await axios.get(`${APP_URL}/products?limit=${limit}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
        }
    }
);
export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (productId, thunkAPI) => {
        try {
            const res = await axios.get(`${APP_URL}/products/${productId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async (categoryId, thunkAPI) => {
        try {
            const res = await axios.get(`${APP_URL}/products?category=${categoryId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
        }
    }
);
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.products = action.payload?.data || [];
                state.loading = false;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.product = action.payload?.data;
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default productsSlice.reducer;
