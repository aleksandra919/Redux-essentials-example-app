import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '0', name: 'John Dog' },
    { id: '1', name: 'Susan Mitch' },
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
})

export const {} = usersSlice.actions

export default usersSlice.reducer
