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

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        data: [],
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
            });
    },
});

export default analyticsSlice.reducer;
