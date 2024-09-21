import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const fileSlice = createSlice({
    name: 'fileSlice',
    initialState,
    reducers: {
        setFile: (state, action) => {
            state = action.payload;
            return state;
        },
        resetFile: (state) => {
            state = null;
            return state;
        }
    }
});

export const { setFile, resetFile } = fileSlice.actions;
export default fileSlice.reducer;