import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
}

/*
    createAsyncThunk accepts two arguments:

    A string that will be used as the prefix for the generated action types
    A "payload creator" callback function that should return a Promise containing some data, or a rejected Promise with an error
*/

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost) => {
        const response = await client.post('/fakeApi/posts', {
            post: initialPost,
        })
        return response.post
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            console.log('loading')
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            console.log('succeeded')
            state.status = 'succeeded'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts.push(action.payload)
        },
    },
    reducers: {
        //  not needed after using fakeApi
        // addPost: {
        //     reducer(state, action) {
        //         state.posts.push(action.payload)
        //     },
        //     /*
        //         createSlice lets us define a "prepare callback" function when we write a reducer.
        //         The "prepare callback" function can take multiple arguments,
        //         generate random values like unique IDs,
        //         and run whatever other synchronous logic is needed to decide
        //         what values go into the action object.
        //         It should then return an object with the payload field inside.
        //     */
        //     prepare(title, content, userId) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 userId,
        //                 date: new Date().toISOString(),
        //             },
        //         }
        //     },
        // },
        updatePost(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find((post) => post.id === id)

            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        addReaction(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find((post) => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
    },
})

export const { addPost, updatePost, addReaction } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === postId)
