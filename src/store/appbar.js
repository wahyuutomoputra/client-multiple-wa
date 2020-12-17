import { createSlice } from "@reduxjs/toolkit";

const appbar = {
    title: 'Home'
}

const appbarSlice = createSlice({
    name: "appbar",
    initialState: appbar,
    reducers: {
        changeTitle: (state, action) => {
            state.title = action.payload;
        }
    }
});

// export const store = configureStore({
//     reducer: appbarSlice.reducer
// });

const { changeTitle } = appbarSlice.actions;

export const setTitle = (newTitle) => async dispatch => {
    dispatch(changeTitle(newTitle))
}
export default appbarSlice.reducer;