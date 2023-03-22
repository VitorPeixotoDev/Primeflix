import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './favorites.css'

const Favorites = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const movieList = localStorage.getItem('@primeflix')
        setMovies(JSON.parse(movieList) || [])
    }, [])

    const deleteMovie = id => {
        let movieFilter = movies.filter(movie => movie.id !== id)
        setMovies(movieFilter)
        localStorage.setItem('@primeflix', JSON.stringify(movieFilter))
        toast.error('Filme removido com sucesso.')
    }


    return(
        <div className='my-movies'>
            <h1>Meus Favoritos</h1>

            {movies.length === 0 && <span>Você ainda não tem nenhum filme na sua lista... 🤨</span>}

            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <span>{movie.title}</span>
                        <div>
                            <Link to={`/movie/${movie.id}`}>ver detalhes</Link>
                            <button onClick={() => deleteMovie(movie.id)}>excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Favorites