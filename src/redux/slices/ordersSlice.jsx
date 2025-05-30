
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

export const fetchAdminOrders = createAsyncThunk('orders/fetchAdminOrders', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        if (!token || token == "undefined") {
            return thunkAPI.rejectWithValue('No token found');
        }
        const response = await axios.get(`${APP_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
});
export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        if (!token || token == "undefined") {
            return thunkAPI.rejectWithValue('No token found');
        }
        const response = await axios.get(`${APP_URL}/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
    }
});

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData, thunkAPI) => {
    try {
        let response = null;
        const token = localStorage.getItem('token');
        if (!token || token == "undefined") {
            response = await axios.post(`${APP_URL}/orders`, orderData, {
                headers: {
                    'Content-Type': 'application/json',

                },
            });
        } else {
            response = await axios.post(`${APP_URL}/orders`, orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
});
export const updateOrderDelivery = createAsyncThunk('orders/updateOrderDelivery', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        if (!token || token === "undefined") {
            return thunkAPI.rejectWithValue('No token found');
        }
        const response = await axios.put(`${APP_URL}/orders/${id}/deliver`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update delivery');
    }
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        selectedOrder: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAdminOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.unshift(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderDelivery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderDelivery.fulfilled, (state, action) => {
                state.loading = false;
                if (state.selectedOrder && state.selectedOrder.data.id === action.payload.data.id) {
                    state.selectedOrder = action.payload;
                }
                const index = state.orders.findIndex(order => order.data.id === action.payload.data.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrderDelivery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ordersSlice.reducer;
