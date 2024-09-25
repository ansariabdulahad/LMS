import { configureStore } from "@reduxjs/toolkit";
import uploadSlice from "./slices/upload.slice";
import fileSlice from "./slices/file.slice";
import courseSlice from "./slices/course.slice";

const store = configureStore({
    devTools: true,
    reducer: {
        uploadSlice,
        fileSlice,
        courseSlice
    }
});

export default store;