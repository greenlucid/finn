import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'



import blogFormReducer from './reducers/blogFormReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import loginFormReducer from './reducers/loginFormReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import commentFormReducer from './reducers/commentFormReducer'

const reducer = combineReducers({
  blogform: blogFormReducer,
  blogs: blogsReducer,
  notification: notificationReducer,
  loginform: loginFormReducer,
  commentform: commentFormReducer,
  user: userReducer,
  users: usersReducer
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)