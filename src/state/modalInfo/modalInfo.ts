import { createSlice } from "@reduxjs/toolkit";

type ModalInfoState = {
    isOpen: boolean
    completedTime: undefined | number
    signsCount: undefined | number
    signsSpeed: undefined | number
    totalAccuracy: undefined | number
}

const initialState: ModalInfoState = {
    isOpen: false,
    completedTime: undefined,
    signsCount: undefined,
    signsSpeed: undefined,
    totalAccuracy: undefined,
}

const modalInfoSlice = createSlice({
    name: 'modalInfo',
    initialState,
    reducers: {
        addFinalModalIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        addCompleteTime: (state, action) => {
            state.completedTime = action.payload
        },
        addSignsCount: (state, action) => {
            state.signsCount = action.payload
        },
        addSignsSpeed: (state, action) => {
            state.signsSpeed = action.payload
        },
        addTotalAccuracy: (state, action) => {
            state.totalAccuracy = action.payload
        }

    }
})

export const { addCompleteTime, addSignsSpeed, addSignsCount, addTotalAccuracy, addFinalModalIsOpen } = modalInfoSlice.actions

export default modalInfoSlice.reducer;