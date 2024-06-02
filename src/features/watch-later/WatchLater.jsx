import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Movie from '../../components/Movie'
import '../../styles/starred.scss'
import { removeAllWatchLater } from './watchLaterSlice'

const WatchLater = ({viewTrailer}) => {
  const state = useSelector(state => state)
  const {watchLater} = state
  const dispatch = useDispatch()

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLater.watchLaterMovies.length > 0 && (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="row">
            {watchLater.watchLaterMovies.map(movie => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>

          <footer className="text-center">
            <button className="btn btn-primary" onClick={() => dispatch(removeAllWatchLater())}>
              Empty list
            </button>
          </footer>
        </div>
      )}

      {watchLater.watchLaterMovies.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default WatchLater