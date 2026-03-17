
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as UserService from '../services/UserService';

// כניסה — שומר token ו-user ב-localStorage
export const login = createAsyncThunk('users/login',
    async ({ owner, password }) => {
        const { user, token } = await UserService.login(owner, password);
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return user;
    }
);

// הרשמה — שומר token ו-user ב-localStorage
export const register = createAsyncThunk('users/register',
    async ({ owner, firstName, lastName, password }) => {
        const { user, token } = await UserService.register(owner, firstName, lastName, password);
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return user;
    }
);

// טעינה/רענון — קורא user מ-localStorage (לא צריך שרת)
const loadUserFromStorage = () => {
    try {
        const raw = localStorage.getItem('user')
        return raw ? JSON.parse(raw) : {}
    } catch { return {} }
}

const userSlice = createSlice({
    name: 'users',
    initialState: { current: loadUserFromStorage(), loading: false, error: null },
    reducers: {
        // התנתקות — מוחק מ-localStorage ומנקה Redux
        logout: (state) => {
            state.current = {}
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        const onSuccess = (state, action) => {
            state.current = action.payload;
            state.loading = false;
            state.error   = null;
        };
        builder
            .addCase(login.fulfilled,    onSuccess)
            .addCase(register.fulfilled, onSuccess)
            .addMatcher(a => a.type.endsWith('/pending'),  (state) => { state.loading = true; })
            .addMatcher(a => a.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.error   = action.error.message;
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
