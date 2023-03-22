import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './home.css'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadMovie = async () => {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: 'aab853762bedf61fac4c1481aa74e9d3',
                    language: 'pt-BR',
                    page: 1
                }
            })
            console.log(response.data)
            setMovies(response.data.results.slice(0, 20))
            setLoading(false)
        }

        loadMovie()
    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>carregando filmes... </h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="movies-list">
                {movies.map(movie => (
                    <article key={movie.id}>
                        <strong>{movie.title}</strong>
                        <img 
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <Link to={`/movie/${movie.id}`}>acessar</Link>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Home