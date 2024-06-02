import {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import 'reactjs-popup/dist/index.css'
import {ENDPOINT, API_KEY} from './constants'
import Header from './components/Header'
import Movies from './features/movies/Movies'
import Starred from './features/starred/Starred'
import WatchLater from './features/watch-later/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './styles/app.scss'

const App = () => {
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const closeModal = () => setOpen(false)

  const closeCard = () => {}

  const viewTrailer = movie => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async id => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL).then(response => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  return (
    <div className="App">
      <Header />

      <div className="container">
        {videoKey ? (
          <YouTubePlayer videoKey={videoKey} />
        ) : (
          <div style={{padding: '30px'}}>
            <h6>no trailer available. Try another movie</h6>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Movies viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
