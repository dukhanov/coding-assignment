import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  watchLaterMovies: [],
}

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState,
  reducers: {
    addToWatchLater: (state, action) => {
      state.watchLaterMovies.push(action.payload)
    },
    removeFromWatchLater: (state, action) => {
      const indexOfId = state.watchLaterMovies.findIndex(key => key.id === action.payload.id)
      state.watchLaterMovies.splice(indexOfId, 1)
    },
    removeAllWatchLater: state => {
      state.watchLaterMovies = []
    },
  },
})

export const selectWatchLaterMovies = state => state.watchLater.watchLaterMovies

export const {addToWatchLater, removeAllWatchLater, removeFromWatchLater} = watchLaterSlice.actions

export default watchLaterSlice.reducer
