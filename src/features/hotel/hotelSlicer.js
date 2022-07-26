import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    hotelData: []
}
const hotelSlicer = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        selectedHotel:(state, {payload})=>{
            state.hotelData = payload.newhotelData;
        }
    }
})
export const{selectedHotel} = hotelSlicer.actions;
export default hotelSlicer.reducer;