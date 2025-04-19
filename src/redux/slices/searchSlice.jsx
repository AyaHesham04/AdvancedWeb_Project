// src/redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APP_URL from '../../Api/baseURL';

export const fetchSearchResults = createAsyncThunk(
    'search/fetchResults',
    async (query, thunkAPI) => {
        try {
            const res = await axios.get(`${APP_URL}/search?q=${encodeURIComponent(query)}`);
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || 'Search failed');
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        clearSearch: (state) => {
            state.query = '';
            state.results = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
