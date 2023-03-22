// BASE URL: https://api.themoviedb.org/3/
// URL: movie/550/similar?api_key=aab853762bedf61fac4c1481aa74e9d3&language=pt-BR

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api