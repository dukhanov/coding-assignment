import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from '../features/movies/moviesSlice'
import starredReducer from '../features/starred/starredSlice'
import watchLaterReducer from '../features/watch-later/watchLaterSlice'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    starred: starredReducer,
    watchLater: watchLaterReducer,
  },
})

export default store
