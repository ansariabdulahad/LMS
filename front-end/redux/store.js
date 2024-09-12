import { configureStore } from "@reduxjs/toolkit";
import uploadSlice from "./slices/upload.slice";

const store = configureStore({
    devTools: true,
    reducer: {
        uploadSlice
    }
});

export default store;