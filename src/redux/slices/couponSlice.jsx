// src/redux/slices/couponSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';
import { toast } from 'react-toastify';

export const fetchCoupons = createAsyncThunk('coupon/fetchCoupons', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');

        if (!token || token == "undefined") {
            return thunkAPI.rejectWithValue('No token found');
        }

        const res = await axios.get(`${APP_URL}/coupons`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load coupons');
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to load coupons');
    }
});
export const fetchSingleCoupon = createAsyncThunk(
    'coupon/fetchSingleCoupon',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            if (!token || token === "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }

            const res = await axios.get(`${APP_URL}/coupons/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load coupon');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to load coupon');
        }
    }
);

export const createCoupon = createAsyncThunk(
    'coupon/createCoupon',
    async ({ name, expire, discount }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }
            const res = await axios.post(`${APP_URL}/coupons`, { name, expire, discount }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Coupon created successfully!');
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create coupon');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create coupon');
        }
    }
);
export const updateCoupon = createAsyncThunk(
    'coupon/updateCoupon',
    async ({ id, name, expire, discount }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            if (!token || token === "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }

            const res = await axios.put(`${APP_URL}/coupons/${id}`, { name, expire, discount }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success('Coupon updated successfully!');
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update coupon');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update coupon');
        }
    }
);

export const deleteCoupon = createAsyncThunk(
    'coupon/deleteCoupon',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }
            const res = await axios.delete(`${APP_URL}/coupons/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Coupon deleted successfully!');
            return id;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete coupon');
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete coupon');
        }
    }
);
const couponSlice = createSlice({
    name: 'coupon',
    initialState: {
        coupons: [],
        currentCoupon: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.loading = false;
                state.coupons = action.payload;
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSingleCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCoupon = action.payload;
            })
            .addCase(fetchSingleCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.coupon = action.payload;
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.coupons.findIndex(coupon => coupon.id === action.payload.id);
                if (index !== -1) {
                    state.coupons[index] = action.payload;
                }
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.coupon = null;
            });
    },
});

export const selectCoupons = (state) => state.coupon.coupons;

export default couponSlice.reducer;
