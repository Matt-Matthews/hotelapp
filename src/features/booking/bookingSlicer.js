import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {collection, getDocs } from 'firebase/firestore';
import {firestore} from '../../config/firebase';


const initialState = {
    myData:[],
    bookingsData:[],
    isPending: true,
    roomType: 'Single',
    numAdults: "1",
    maxAdults: "2",
    numChild: "0",
    checkinDate: new Date().toJSON().slice(0,10),
    checkoutDate:   new Date().toJSON().slice(0,10),
    mealsType:"No meals",
    totalPrice:0
}



export const setHotelsData = createAsyncThunk('booking/setHotelsData',()=>{
    const collectionRef = collection(firestore, 'Hotels');
    return getDocs(collectionRef).then((snapshot)=>snapshot.docs.map(doc=>doc.data()))
});
export const setBookingsData = createAsyncThunk('booking/setBookingsData',()=>{
    const collectionRef = collection(firestore, 'Bookings');
    return getDocs(collectionRef).then((snapshot)=>snapshot.docs.map(doc=>doc.data()))
})

const bookingSlicer = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        setData: (state,{payload})=>{
           state.myData = payload.data
        },
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
        },
        extraReducers:{
            [setHotelsData.pending]:(state,actions)=>{
                console.log('pending');
                state.isPending = true;
            },
            [setHotelsData.fulfilled]:(state,actions)=>{
                state.myData = actions.payload;
                state.isPending = false;
                
            },
            [setHotelsData.rejected]:(state,actions)=>{
                console.log('rejected');
                state.isPending = true;
            },

            [setBookingsData.pending]:(state,actions)=>{
                console.log('pending');
               
            },
            [setBookingsData.fulfilled]:(state,actions)=>{
                state.bookingsData = actions.payload;
                
                
            },
            [setBookingsData.rejected]:(state,actions)=>{
                console.log('rejected');
                
            },
        }

    }
);

export const{getCheckinDate,getCheckoutDate,getMealsType,getNumAdults,getNumChild,getRoomType,getTotalPrice, calculateTotalPrice,setData} = bookingSlicer.actions;
export default bookingSlicer.reducer;