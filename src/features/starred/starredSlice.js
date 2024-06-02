import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  starredMovies: [],
}

const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies.unshift(action.payload)
    },
    unstarMovie: (state, action) => {
      const indexOfId = state.starredMovies.findIndex(key => key.id === action.payload.id)
      state.starredMovies.splice(indexOfId, 1)
    },
    clearAllStarred: state => {
      state.starredMovies = []
    },
  },
})

export const selectStarredMovies = state => state.starred.starredMovies

export const {starMovie, unstarMovie, clearAllStarred} = starredSlice.actions

export default starredSlice.reducer
