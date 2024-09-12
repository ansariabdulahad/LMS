import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
    name: 'uploadSlice',
    initialState: 0,
    reducers: {
        setUpload: (state, action) => {
            state = action.payload;
            return state;
        },
        getState: (state) => {
            return state;
        }
    }
});

export const { setUpload, getState } = uploadSlice.actions;
export default uploadSlice.reducer;