import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    {
        id: '1',
        title: 'First Post!',
        content: 'Hello!',
        userId: '0',
        date: '2020-01-02',
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
        },
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'More text',
        userId: '1',
        date: '2020-01-02',
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
        },
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.push(action.payload)
            },
            /*
                createSlice lets us define a "prepare callback" function when we write a reducer. 
                The "prepare callback" function can take multiple arguments, 
                generate random values like unique IDs, 
                and run whatever other synchronous logic is needed to decide 
                what values go into the action object. 
                It should then return an object with the payload field inside.
            */
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                    },
                }
            },
        },
        updatePost(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find((post) => post.id === id)

            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        addReaction(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find((post) => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
    },
})

export const { addPost, updatePost, addReaction } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts

export const selectPostById = (state, postId) =>
    state.posts.find((post) => post.id === postId)
