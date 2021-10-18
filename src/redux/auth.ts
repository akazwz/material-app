import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const expiredAt = localStorage.getItem('expired_at');
const username = localStorage.getItem('username');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: token,
        expiredAt: expiredAt,
        username: username,
    },
    reducers: {
        setToken: (state, actions: PayloadAction<string>) => {
            state.token = actions.payload;
        },
        setExpiredAt: (state, actions: PayloadAction<string>) => {
            state.expiredAt = actions.payload;
        },
        setUsername: (state, actions: PayloadAction<string>) => {
            state.username = actions.payload;
        }
    }
});

export const {setToken, setExpiredAt, setUsername} = authSlice.actions;

export const auth = (state: { auth: { token: string, expiredAt: string, username: string } }) => state;

export default authSlice.reducer;
