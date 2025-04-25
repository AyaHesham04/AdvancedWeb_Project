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
export const fetchCategoryById = createAsyncThunk(
    'category/fetchById',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`${APP_URL}/categories/${id}`);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Fetch failed');
        }
    }
);
export const createCategory = createAsyncThunk(
    'category/create',
    async (formData, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }

            const res = await axios.post(`${APP_URL}/categories`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Create failed');
        }
    }
);
export const updateCategory = createAsyncThunk(
    'category/update',
    async ({ id, formData }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token === "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }

            const res = await axios.put(`${APP_URL}/categories/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Update failed');
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }

            await axios.delete(`${APP_URL}/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return { id };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Delete failed');
        }
    }
);
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
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
                state.loading = false;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (category) => category._id !== action.payload.id
                );
                state.loading = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default categorySlice.reducer;
