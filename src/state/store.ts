import { configureStore } from "@reduxjs/toolkit";
import fishSlice from './text/textInputFiling';
import modalInfoSlice from './modalInfo/modalInfo'

export const store = configureStore({
    reducer: {
        fishText: fishSlice,
        modalInfo: modalInfoSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;