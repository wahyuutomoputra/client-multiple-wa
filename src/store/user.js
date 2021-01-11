import { createSlice } from "@reduxjs/toolkit";

const user = {
    isLogin: false
}

const userSlice = createSlice({
    name: "user",
    initialState: user,
    reducers: {
        changeStatus: (state, action) => {
            state.isLogin = action.payload;
        }
    }
});


const { changeStatus } = userSlice.actions;

export const setStatus = (newStatus) => async dispatch => {
    dispatch(changeStatus(newStatus))
}
export default userSlice.reducer;