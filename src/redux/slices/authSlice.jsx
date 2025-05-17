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
        localStorage.removeItem('token');
        localStorage.removeItem('name');

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
            const token = res.data.token;
            if (token) localStorage.setItem('token', token);
            return res.data.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Login failed'
            );
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ name, email, phone, password, confirmPassword }, thunkAPI) => {
        try {
            const res = await axios.post(`${APP_URL}/auth/signup`, {
                name,
                email,
                phone,
                password,
                confirmPassword,
            });
            const token = res.data.token;
            if (token) localStorage.setItem('token', token);
            return res.data.data.user;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || { message: 'Signup failed' }
            );
        }
    }
);

export const updateUserProfileData = createAsyncThunk(
    'auth/updateProfile',
    async ({ body }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return thunkAPI.rejectWithValue('Not authenticated');
            }
            const res = await axios.put(
                `${APP_URL}/users/updateMe`,
                body,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return res.data.data.user;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || { message: 'Update failed' }
            );
        }
    }
);


export const updateUserPassword = createAsyncThunk(
    'auth/updatePassword',
    async ({ currentPassword, password, passwordConfirm }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return thunkAPI.rejectWithValue('Not authenticated');
            }
            const res = await axios.put(
                `${APP_URL}/users/changeMyPassword`,
                { currentPassword, password, passwordConfirm },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || { message: 'Password change failed' }
            );
        }
    }
);
export const addUserAddress = createAsyncThunk(
    'auth/addAddress',
    async (addressData, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return thunkAPI.rejectWithValue('Not authenticated');
            }
            const res = await axios.post(
                `${APP_URL}/addresses`,
                addressData,
                { headers: { Authorization: `Bearer ${token}` } }

            );
            return res.data.data.address;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || { message: 'Add address failed' });
        }
    }
);
export const deleteUserAddress = createAsyncThunk(
    'auth/addresses',
    async ({ id }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return thunkAPI.rejectWithValue('Not authenticated');
            }
            const res = await axios.delete(
                `${APP_URL}/addresses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }
            );
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || { message: 'Password change failed' }
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        addresses: [],
        addingAddress: false,
        deletingAddress: false,
        registerSuccess: false,
        updatingProfile: false,
        updatingPassword: false,
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
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, { payload }) => {
                state.user = null;
                state.error = payload;
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
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.user = null;
                state.error = payload;
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
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.user = null;
                state.error = payload;
                state.loading = false;
                state.registerSuccess = false;
            })

            .addCase(updateUserProfileData.pending, (state) => {
                state.updatingProfile = true;
                state.error = null;
            })
            .addCase(updateUserProfileData.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.updatingProfile = false;
            })
            .addCase(updateUserProfileData.rejected, (state, { payload }) => {
                state.error = payload;
                state.updatingProfile = false;
            })

            .addCase(updateUserPassword.pending, (state) => {
                state.updatingPassword = true;
                state.error = null;
            })
            .addCase(updateUserPassword.fulfilled, (state) => {
                state.updatingPassword = false;
            })
            .addCase(updateUserPassword.rejected, (state, { payload }) => {
                state.error = payload;
                state.updatingPassword = false;
            })
            .addCase(addUserAddress.pending, (state) => {
                state.addingAddress = true;
                state.error = null;
            })
            .addCase(addUserAddress.fulfilled, (state, { payload }) => {
                state.addresses.push(payload);
                state.addingAddress = false;
            })
            .addCase(addUserAddress.rejected, (state, { payload }) => {
                state.error = payload.message || payload;
                state.addingAddress = false;
            })

            .addCase(deleteUserAddress.pending, (state) => {
                state.deletingAddress = true;
                state.error = null;
            })
            .addCase(deleteUserAddress.fulfilled, (state, { payload: id }) => {
                state.addresses = state.addresses.filter(addr => addr._id !== id);
                state.deletingAddress = false;
            })
            .addCase(deleteUserAddress.rejected, (state, { payload }) => {
                state.error = payload.message || payload;
                state.deletingAddress = false;
            });
    },
});

export const { logOut, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
