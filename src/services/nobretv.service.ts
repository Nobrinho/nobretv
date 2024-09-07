import axios from 'axios'
import { MOVIE } from './shared/path-rest-constants'
import { TV } from './shared/path-rest-constants'
import type { MediaType } from '../types/MediaType'
import type { AboutMediaType } from '@/types/AboutMediaType'
import type { AboutSerieType } from '@/types/AboutSerieType'
import type { TrailerType } from '@/types/TrailerType'
import type { RawBodyType } from '@/types/RawBodyType'




class NobreTvService {
    private bearer: string = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzg0ZTdhMWYwMjJhN2VkZjMzZWIxYmFhMmFhNzNmYSIsIm5iZiI6MTcyNTQ5MDQxMy41Mzc5MjMsInN1YiI6IjY2ZDhlMDgzNzA5ZmJlYmU0MjFhYmYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ad3435cKP07ttCTev_wDNHWRttN0h_N4Wb8Lpxh2fuE'
    private url: string = 'https://api.themoviedb.org/3'
    private axiosInstance

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.url,
            headers: {
                'Authorization': this.bearer,
                'Accept-Language': 'pt-BR'
            }
        })

        this.axiosInstance.interceptors.request.use(config => {
            config.params = {
                ...config.params,
                language: 'pt-BR'
            };
            return config
        })
    }

    async getAll(): Promise<MediaType> {
        return this.axiosInstance.get('trending/all/day')
    }
    async getMovies(): Promise<MediaType> {
        return this.axiosInstance.get(`trending${MOVIE}/day`)
    }
    async getSeries(): Promise<MediaType> {
        return this.axiosInstance.get(`/trending${TV}/day`)
    }
    async getMovieById(movie_id: number): Promise<AboutMediaType> {
        return this.axiosInstance.get(`${MOVIE}/${movie_id}`)
    }
    async getSerieById(serie_id: number): Promise<AboutSerieType> {
        return this.axiosInstance.get(`${TV}/${serie_id}`)
    }
    async getDataTrailer(movie_id: number): Promise<TrailerType> {
        return this.axiosInstance.get(`${MOVIE}/${movie_id}/videos`)
    }
    async addToFavorites(acount_id: number, raw_body: RawBodyType): Promise<any> {
        return this.axiosInstance.post(`/account/${acount_id}/favorite`, raw_body)
    }
    async getFavorites(acount_id: number): Promise<any> {
        return this.axiosInstance.get(`/account/${acount_id}/favorite/movies`)
    }
    async getFavoritesSeries(acount_id: number): Promise<any> {
        return this.axiosInstance.get(`/account/${acount_id}/favorite/tv`)
    }
}
export default new NobreTvService()