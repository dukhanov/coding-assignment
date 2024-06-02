import {useCallback, useEffect, useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {selectStarredMovies} from '../features/starred/starredSlice'
import {useSearchQuery} from '../hooks/useSearchQuery'
import {fetchMovies} from '../features/movies/moviesSlice'
import '../styles/header.scss'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const starredMovies = useSelector(selectStarredMovies)
  const [searchQuery, setSearchQuery] = useSearchQuery()
  const doSearchMovies = useCallback((value = '') => {
    navigate('/')
    setSearchQuery(value)
    dispatch(fetchMovies(value))
  }, [])

  useEffect(() => {
    dispatch(fetchMovies(searchQuery))
  }, [])

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => doSearchMovies('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          value={searchQuery}
          onChange={e => doSearchMovies(e.target.value)}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  )
}

export default Header
