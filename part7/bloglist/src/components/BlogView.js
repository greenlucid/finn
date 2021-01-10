import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCommentform } from '../reducers/commentFormReducer'

const Comments = ({ comments }) => {
  if (!comments) {
    return (
      <div>
        loading comments...
      </div>
    )
  }
  else if (comments.length === 0) {
    return (
      <div>
        No comments
      </div>
    )
  }
  else {
    const keyedComments = comments.map((comment, index) => ({ text: comment, id: index }))
    return (
      <div>
        <h3>{keyedComments.length} comments</h3>
        <ul>
          {keyedComments.map(comment => (
            <li key={comment.id}>
              {comment.text}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const CommentPoster = ({ blog, handleCommentPost }) => {
  const commentform = useSelector(state => state.commentform)
  const dispatch = useDispatch()
  return (
    <div>
      <form onSubmit={handleCommentPost}>
        <input
          type='text'
          value={commentform.text}
          onChange={({ target }) =>
            dispatch(changeCommentform(target.value, blog))
          }
        />
        <button id='commentButton'>
          add comment
        </button>
      </form>
    </div>
  )
}

const BlogView = ({ blog, handleLike, handleCommentPost }) => {
  if (!blog) {
    return (
      <div>
        loading blog...
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>{blog.title}</h2>
        <br/><span><a href={blog.url}>{blog.url}</a></span>
        <br/><span>{blog.likes} likes</span>
        <button onClick={() => handleLike(blog.id)}>like</button>
        <br/><span>added by {blog.user.name}</span>
        <h2>Comments</h2>
        <CommentPoster blog={blog} handleCommentPost={handleCommentPost}/>
        <Comments comments={blog.comments}/>
      </div>
    )
  }
}

export default BlogView