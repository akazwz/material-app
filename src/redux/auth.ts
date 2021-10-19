import {createSlice, PayloadAction} from '@reduxjs/toolkit';

let token = localStorage.getItem('token');
let expiredAt = localStorage.getItem('expired_at');


interface User {
    header_img: string,
    nick_name: string,
    username: string,
    authority_id: string,
}

let userL: User;

let localUser = localStorage.getItem('user');

if (localUser !== null) {
    userL = JSON.parse(localUser);
} else {
    userL = {
        header_img: '',
        nick_name: '',
        username: '',
        authority_id: '',
    }
}

if (!token) {
    token = 'token';
}
if (!expiredAt) {
    expiredAt = 'forever';
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: token,
        expiredAt: expiredAt,
        user: userL,
    },
    reducers: {
        setToken: (state, actions: PayloadAction<string>) => {
            state.token = actions.payload;
        },
        setExpiredAt: (state, actions: PayloadAction<string>) => {
            state.expiredAt = actions.payload;
        },
        setUser: (state, actions: PayloadAction<User>) => {
            state.user = actions.payload;
        }
    }
});

export const {setToken, setExpiredAt, setUser} = authSlice.actions;

export const auth = (state: { auth: { token: string, expiredAt: string, user: User } }) => state;

export default authSlice.reducer;
