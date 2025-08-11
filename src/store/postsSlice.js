import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 비동기 thunk - 단일 포스트 조회
export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  currentPost: null,
  loading: false,
  error: null,
  lastFetchedId: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPost: (state) => {
      state.currentPost = null
      state.error = null
      state.lastFetchedId = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false
        state.currentPost = action.payload
        state.lastFetchedId = action.payload.id
        state.error = null
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.currentPost = null
      })
  },
})

export const { clearPost, clearError } = postsSlice.actions

export default postsSlice.reducer 