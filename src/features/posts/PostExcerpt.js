import React from 'react'

import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

export const PostExcerpt = ({ key, post }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
                <ReactionButtons post={post} />
            </div>

            <Link to={`/posts/${key}`} className="button muted-button">
                View post
            </Link>
            <Link to={`/editedPost/${key}`} className="button muted-button">
                Edit post
            </Link>
        </article>
    )
}

export default PostExcerpt
