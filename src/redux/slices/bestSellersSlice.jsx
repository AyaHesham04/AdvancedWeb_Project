import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

export const fetchBestSellers = createAsyncThunk(
    'bestSellers/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${APP_URL}/best-sellers/`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
        }
    }
);

const bestSellersSlice = createSlice({
    name: 'bestSellers',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBestSellers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBestSellers.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 'error') {
                    state.products = [];
                    state.error = action.payload.message;
                } else {
                    state.products = action.payload.data;
                    state.error = null;
                }
            })
            .addCase(fetchBestSellers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                state.products = [];
            });
    },
});

export default bestSellersSlice.reducer;
