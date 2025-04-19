import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');

        if (!token || token == "undefined") {
            return thunkAPI.rejectWithValue('No token found');
        }

        const res = await axios.get(`${APP_URL}/users/getMe`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

        });
        const name = res.data?.data?.name;
        localStorage.setItem('name', name);

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
    }
});
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await axios.post(`${APP_URL}/auth/login`, {
                email,
                password,
            });

            const token = res.data?.token;

            if (token) {
                localStorage.setItem('token', token);
            }

            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);
export const registerUser = createAsyncThunk(
    'auth/register',
    async (
        { name, email, phone, password, confirmPassword },
        thunkAPI
    ) => {
        try {
            const res = await axios.post(`${APP_URL}/auth/signup`, {
                name,
                email,
                phone,
                password,
                confirmPassword,
            });
            const token = res.data?.token;
            if (token) localStorage.setItem('token', token);
            return res.data;
        } catch (err) {
            const errData = err.response?.data || { message: 'Signup failed' };
            return thunkAPI.rejectWithValue(errData);
        }
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        registerSuccess: false,
    },
    reducers: {
        logOut: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
        clearAuthState: (state) => {
            state.loading = false;
            state.error = null;
            state.registerSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload?.data?.user || null;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.registerSuccess = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.data?.user || null;
                state.loading = false;
                state.registerSuccess = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload;
                state.loading = false;
                state.registerSuccess = false;
            });
    },
});

export const { logOut, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
