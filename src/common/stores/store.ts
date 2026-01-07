import { usersReducer } from '@/features/users/stores/users-store';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;