import {createSlice, PayloadAction} from '@reduxjs/toolkit';

let token = localStorage.getItem('token');
let expiredAt = localStorage.getItem('expired_at');
let username = localStorage.getItem('username');

if (!token) {
    token = 'token';
}
if (!expiredAt) {
    expiredAt = 'forever';
}

if (!username) {
    username = 'zwz';
}

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
