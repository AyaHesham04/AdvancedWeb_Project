// src/redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';


export const fetchCategories = createAsyncThunk('category/fetchAll', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${APP_URL}/categories`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload.data;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default categorySlice.reducer;
