import { createSlice } from "@reduxjs/toolkit";

type ModalState = {
    value: boolean;
}

const initialState: ModalState = {
    value: true,
}

const modalSlice = createSlice({
    name: 'modalBoolean',
    initialState,
    reducers: {
        setModalIsOpen: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setModalIsOpen } = modalSlice.actions

export default modalSlice.reducer;