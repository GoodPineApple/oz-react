import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import postsReducer from './postsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  },
}) 