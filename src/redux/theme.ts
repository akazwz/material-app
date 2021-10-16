import {createSlice} from '@reduxjs/toolkit';

let themeType = localStorage.getItem('theme');
if (!themeType) {
    themeType = 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: themeType,
    },
    reducers: {
        setLight: state => {
            console.log('light');
            state.value = 'light'
        },
        setDark: state => {
            console.log('dark');
            state.value = 'dark'
        },
    }
});

export const {setLight, setDark} = themeSlice.actions;

export const themeValue = (state: { theme: { value: any }; }) => state.theme.value;

export default themeSlice.reducer;
