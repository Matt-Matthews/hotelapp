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
            window.scrollTo(0, 0);
        },
        closeLoginModal:(state, action) =>{
            state.isLoginOpen = false;
            window.scrollTo(0, 0);
        },
        openRegModal:(state, action) =>{
            state.isRegOpen = true;
            window.scrollTo(0, 0)
        },
        closeRegModal:(state, action) =>{
            state.isRegOpen = false;
            window.scrollTo(0, 0)
        }
    }
})

export const {openLoginModal, closeLoginModal,openRegModal,closeRegModal} = modalSlice.actions;
export default modalSlice.reducer;