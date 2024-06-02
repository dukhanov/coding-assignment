import {useSelector} from 'react-redux'
import {selectIsLoading, selectMovies} from './moviesSlice'
import Movie from '../../components/Movie'
import '../../styles/movies.scss'

const Movies = ({viewTrailer, closeCard}) => {
  const movies = useSelector(selectMovies)
  const isLoading = useSelector(selectIsLoading)

  return (
    <div data-testid="movies" className="movies">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        movies?.results?.map(movie => {
          return <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} closeCard={closeCard} />
        })
      )}
    </div>
  )
}

export default Movies
