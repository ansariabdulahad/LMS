import { configureStore } from "@reduxjs/toolkit";
import uploadSlice from "./slices/upload.slice";
import fileSlice from "./slices/file.slice";

const store = configureStore({
    devTools: true,
    reducer: {
        uploadSlice,
        fileSlice
    }
});

export default store;