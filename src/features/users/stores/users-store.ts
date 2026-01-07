import { fetchUsers } from "@/common/api/requests/fetch-users";
import type { User } from "@/common/entities/user"
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface UsersState {
    users: User[];
    isLoading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    isLoading: false,
    error: null,
}

export const loadUsers = createAsyncThunk<User[]>(
    "users/loadUsers",
    async (_, { rejectWithValue }) => {
        try {
            const users = await fetchUsers();

            return users;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(loadUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
})

export const { setUsers } = usersSlice.actions

export const selectUsers = (state: { users: UsersState }) => state.users.users
export const selectUsersLoading = (state: { users: UsersState }) => state.users.isLoading
export const selectUsersError = (state: { users: UsersState }) => state.users.error

export const usersReducer = usersSlice.reducer