import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
/* 
    Redux Toolkit has a utility function called unwrapResult 
    that will return either the actual action.payload value from a fulfilled action,
    or throw an error if it's the rejected action.
 */
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewPost } from './postsSlice'

export const AddPostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector((state) => state.users)

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                const resultAction = await dispatch(
                    addNewPost({
                        title,
                        content,
                        userId,
                    })
                )
                unwrapResult(resultAction)
                setTitle('')
                setContent('')
                setUserId('')
            } catch (error) {
                console.error('Failed to save the post: ', error)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const canSave =
        // [title, content, userId].every(Boolean)
        Boolean(title) &&
        Boolean(content) &&
        Boolean(userId) &&
        addRequestStatus === 'idle'

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}
