import React from 'react'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/dist/query'
import moviesReducer from '../features/movies/moviesSlice'
import starredReducer from '../features/starred/starredSlice'
import watchLaterReducer from '../features/watch-later/watchLaterSlice'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        movies: moviesReducer,
        starred: starredReducer,
        watchLater: watchLaterReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch)

  function Wrapper({children}) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}
