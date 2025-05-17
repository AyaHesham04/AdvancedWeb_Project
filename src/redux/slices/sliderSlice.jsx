
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';


export const fetchSliders = createAsyncThunk(
    'slider/fetchAll',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${APP_URL}/sliders`);
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || 'Failed to load sliders');
        }
    }
);


export const deleteSlider = createAsyncThunk(
    'slider/delete',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }
            await axios.delete(`${APP_URL}/sliders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || 'Failed to delete slider');
        }
    }
);


export const uploadSlider = createAsyncThunk(
    'slider/upload',
    async (imageFile, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || token == "undefined") {
                return thunkAPI.rejectWithValue('No token found');
            }
            const formData = new FormData();
            formData.append('image', imageFile);
            const res = await axios.post(`${APP_URL}/sliders`, formData, {
                Authorization: `Bearer ${token}`,
                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`, },

            });
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || 'Failed to upload slider');
        }
    }
);

const sliderSlice = createSlice({
    name: 'slider',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearSliders(state) {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSliders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSliders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchSliders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteSlider.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSlider.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(
                    slider => slider.id !== action.meta.arg
                );
            })

            .addCase(deleteSlider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(uploadSlider.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadSlider.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
            })
            .addCase(uploadSlider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSliders } = sliderSlice.actions;
export default sliderSlice.reducer;
