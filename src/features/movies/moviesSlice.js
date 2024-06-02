import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ENDPOINT_DISCOVER, ENDPOINT_SEARCH} from '../../constants'

let abortController = null

export const fetchMovies = createAsyncThunk('fetch-movies', async (searchQuery = null) => {
  abortController?.abort()
  abortController = new AbortController()

  const URL = searchQuery ? `${ENDPOINT_SEARCH}&query=${searchQuery}` : ENDPOINT_DISCOVER
  const response = await fetch(URL, abortController.signal)
  return response.json()
})

const initialState = {
  movies: [],
  fetchStatus: 'idle',
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload
        state.fetchStatus = 'success'
      })
      .addCase(fetchMovies.pending, state => {
        state.fetchStatus = 'loading'
      })
      .addCase(fetchMovies.rejected, state => {
        state.fetchStatus = 'error'
      })
  },
})

export const selectMovies = state => state.movies.movies
export const selectIsLoading = state => state.movies.fetchStatus === 'loading'

export default moviesSlice.reducer
