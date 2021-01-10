const emptyComment = {
  text: '',
  id: null
}

export const clearCommentform = () => ({
  type: 'CLEAR_COMMENTFORM'
})

export const changeCommentform = (text, blog) => ({
  type: 'CHANGE_COMMENTFORM',
  commentform: {
    text, blog
  }
})

const commentFormReducer = (state = emptyComment, action) => {
  switch (action.type) {
    case 'CLEAR_COMMENTFORM':
    case 'POST_COMMENT':
      return emptyComment
    case 'CHANGE_COMMENTFORM':
      return action.commentform
    default:
      return state
  }
}

export default commentFormReducer