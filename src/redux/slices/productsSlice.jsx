import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async (limit, thunkAPI) => {
        try {
            const res = await axios.get(`${APP_URL}/products?limit=1000`);
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
export const createProduct = createAsyncThunk(
    'products/create',
    async (productData, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }
            const res = await axios.post(`${APP_URL}/products`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Create failed');
        }
    }
);
export const updateProduct = createAsyncThunk(
    'product/update',
    async ({ id, formData }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token === "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }

            const res = await axios.put(`${APP_URL}/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Update failed');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (productId, thunkAPI) => {
        try {
            await axios.delete(`${APP_URL}/products/${productId}`);
            return { id: productId };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Delete failed');
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
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.loading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.selectedProduct = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload.id);
                state.loading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default productsSlice.reducer;
