import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        addUserIntoApp: (state, action) => {
            return action.payload;
        },

        removeUserFromApp: (state, action) => {
            return {};
        },
    },
});

const { actions, reducer } = user;
export const { addUserIntoApp, removeUserFromApp } = actions;
export default reducer;
