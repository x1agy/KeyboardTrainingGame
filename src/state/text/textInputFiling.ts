import { createSlice } from "@reduxjs/toolkit";

type FishState = {
    value: string;
}

const initialState: FishState = {
    value: '',
}

const fishSlice = createSlice({
    name: 'fishText',
    initialState,
    reducers: {
        setFishText: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setFishText } = fishSlice.actions

export default fishSlice.reducer;