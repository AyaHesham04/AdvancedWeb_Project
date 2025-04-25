import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

export const fetchDailyAccess = createAsyncThunk(
    'dailyAccess/fetch',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }
            const res = await axios.get(`${APP_URL}/daily-access`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
        }
    }
);
export const fetchViewsOnProduct = createAsyncThunk(
    'viewsOnProduct/fetch',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }
            const res = await axios.get(`${APP_URL}/products/views`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
        }
    }
);

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        data: [],
        productViews: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDailyAccess.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDailyAccess.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 'error') {
                    state.data = [];
                    state.error = action.payload.message;
                } else {
                    state.data = action.payload.data;
                    state.error = null;
                }
            })
            .addCase(fetchDailyAccess.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                state.data = [];
            })
            .addCase(fetchViewsOnProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchViewsOnProduct.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 'error') {
                    state.productViews = [];
                    state.error = action.payload.message;
                } else {
                    state.productViews = action.payload.data;
                    state.error = null;
                }
            })
            .addCase(fetchViewsOnProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                state.productViews = [];
            });
    },
});

export default analyticsSlice.reducer;
