import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT;

const initialState = {
    loading: null,
    data: null,
    error: null
}

const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setLoading, setData, setError } = courseSlice.actions;
export default courseSlice.reducer;

export const getCourse = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.get('/course/');
        dispatch(setData(data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setError(error.response.data));
        dispatch(setLoading(false));
    }
}