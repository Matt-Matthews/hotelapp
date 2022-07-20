import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoginOpen: false,
    isRegOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:{
        openLoginModal:(state, action) =>{
            state.isLoginOpen = true;
        },
        closeLoginModal:(state, action) =>{
            state.isLoginOpen = false;
        },
        openRegModal:(state, action) =>{
            state.isRegOpen = true;
        },
        closeRegModal:(state, action) =>{
            state.isRegOpen = false;
        }
    }
})

export const {openLoginModal, closeLoginModal,openRegModal,closeRegModal} = modalSlice.actions;
export default modalSlice.reducer;