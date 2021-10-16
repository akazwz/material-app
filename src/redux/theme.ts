import {createSlice, PayloadAction} from '@reduxjs/toolkit';

let themeType = localStorage.getItem('theme');
let mode: 'light' | 'dark';

switch (themeType) {
    case 'light':
        mode = 'light'
        break;
    case 'dark':
        mode = 'dark';
        break
    default:
        mode = 'light';
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: mode,
        mainColor: '#3f50b5',
    },
    reducers: {
        setThemeMode: (state, actions: PayloadAction<'light' | 'dark'>) => {
            state.mode = actions.payload;
        },
        setThemeMainColor: (state, actions: PayloadAction<string>) => {
            state.mainColor = actions.payload;
        }
    }
});

export const {setThemeMode, setThemeMainColor} = themeSlice.actions;

export const theme = (state: { theme: { mode: 'light' | 'dark', mainColor: string } }) => state;

export default themeSlice.reducer;
