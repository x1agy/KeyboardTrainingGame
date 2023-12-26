import { configureStore } from "@reduxjs/toolkit";
import fishSlice from './text/textInputFiling';
import modalSlice from './modalState/isModalOpen'
import modalInfo from "./modalInfo/modalInfo";

export const store = configureStore({
    reducer: {
        fishText: fishSlice,
        isModalOpen: modalSlice,
        modalInfo: modalInfo,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;