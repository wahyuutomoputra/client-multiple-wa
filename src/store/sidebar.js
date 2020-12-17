import { createSlice } from "@reduxjs/toolkit";

const sidebar = {
    status: false
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: sidebar,
    reducers: {
        open: (state) => {
            state.status = true;
        },
        close: (state) => {
            state.status = false;
        }
    }
});

const { actions, reducer } = sidebarSlice;

export const { open, close } = actions;
export default reducer;