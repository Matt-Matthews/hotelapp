import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    roomType: 'Single',
    numAdults: "1",
    maxAdults: "2",
    numChild: "0",
    checkinDate: new Date().toJSON().slice(0,10),
    checkoutDate:   new Date().toJSON().slice(0,10),
    mealsType:"No meals",
    totalPrice:0
}

const bookingSlicer = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        getRoomType:(state, {payload})=>{
            state.roomType = payload.roomType;
            state.maxAdults = state.roomType==='Double'?"4":"2";
            state.numAdults = state.numAdults>state.maxAdults?state.maxAdults:state.numAdults
        },
        getNumAdults: (state, {payload})=>{
            state.numAdults = payload.numAdults>1?payload.numAdults:1
        },
        getNumChild:(state, {payload})=>{
            state.numChild = payload.numChild>=0?payload.numChild: 0
        },
        getCheckinDate:(state,{payload})=>{
            state.checkinDate = payload.checkinDate;
            state.checkoutDate = state.checkinDate > state.checkoutDate? state.checkinDate : state.checkoutDate
        },
        getCheckoutDate:(state,{payload})=>{
            state.checkoutDate = payload.checkoutDate
        },
        getMealsType:(state,{payload})=>{
            state.mealsType = payload.mealsType
        },
        getTotalPrice: (state, {payload})=>{
            state.totalPrice = payload.price
        },
        calculateTotalPrice: (state, {payload})=>{
            state.totalPrice = state.totalPrice + parseInt(payload.price );
        }
        }

    }
);

export const{getCheckinDate,getCheckoutDate,getMealsType,getNumAdults,getNumChild,getRoomType,getTotalPrice, calculateTotalPrice} = bookingSlicer.actions;
export default bookingSlicer.reducer;