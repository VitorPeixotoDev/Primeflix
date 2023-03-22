import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../../services/api'

import './movie-info.css'

const Movie = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadMovie = async () => {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: 'aab853762bedf61fac4c1481aa74e9d3',
                    language: 'pt-BR'
                }
            })
            .then(response => {
                setMovie(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log('Filme não encontrado.')
                navigate('/', {replace: true})
                return
            })
        }
        loadMovie()

        return () => console.log('Componente desmontado')
    }, [id, navigate])

    if(loading){
        return(
            <div>
                <h2>carregando detalhes do filme...</h2>
            </div>
        )
    }

    const saveMovie = () => {
        const myList = localStorage.getItem('@primeflix')
        let savedMovies = JSON.parse(myList) || []

        const hasMovie = savedMovies
        .some(savedMovie => savedMovie.id === movie.id)

        if(hasMovie){
            toast.warn('Esse filme já foi adicionado a sua lista.')
            return
        }

        savedMovies.push(movie)
        localStorage.setItem('@primeflix', JSON.stringify(savedMovies))
        toast.success('O filme foi salvo na sua lista de favoritos!')
        return
    }

    
    return(
        <div className='movie-info'>
            <h1>{movie.title}</h1>
            <img 
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
            />
            <h3>sinopse</h3>
            <span>{movie.overview}</span>
            <strong>nota: {movie.vote_average} / 10</strong>

            <div className='area-btns'>
                <button onClick={saveMovie}>salvar</button>
                <button>
                    <a 
                        href={`https://youtube.com/results?search_query=${movie.title} trailer`}
                        target='blank'
                        rel='external'
                    >trailer</a>
                </button>

            </div>
        </div>
    )
}

export default Movie