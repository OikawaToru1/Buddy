import {createSlice , type PayloadAction} from "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string;
        fullName: string | null;
        email: string;
        fileHistory : [string] | null;
        avatar : string | null;
        createdAt : string;
        updatedAt : string;
    } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loginSuccess(state, action : PayloadAction<AuthState['user']>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const {loginSuccess, logout} = authSlice.actions;

export default authSlice.reducer;

