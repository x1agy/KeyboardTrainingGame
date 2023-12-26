import { createSlice } from "@reduxjs/toolkit";

type ModalInfoState = {
    completedTime: undefined | number
}

const initialState: ModalInfoState = {
    completedTime: undefined,
}

const modalInfoSlice = createSlice({
    name: 'modalInfo',
    initialState,
    reducers: {
        addModalInfo: (state, action) => {
            state.completedTime = action.payload
        }
    }
})

export const { addModalInfo } = modalInfoSlice.actions

export default modalInfoSlice.reducer;