import axios from 'axios'
import { MOVIE } from './shared/path-rest-constants'
import { TV } from './shared/path-rest-constants'
import type { MediaType } from '../types/MediaType'
import type { AboutMediaType } from '@/types/AboutMediaType'
import type { AboutSerieType } from '@/types/AboutSerieType'
import type { TrailerType } from '@/types/TrailerType'
import type { RawBodyType } from '@/types/RawBodyType'
import config from '@/config.json'




class NobreTvService {
    private bearer: string = config.VITE_BEARER_TOKEN
    private url: string = config.VITE_MOVIE_URL
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

    async getAll(page: number): Promise<MediaType> {
        return this.axiosInstance.get(`trending/all/day?page=${page}`)
    }
    async getMovies(page: number): Promise<MediaType> {
        return this.axiosInstance.get(`trending${MOVIE}/day?page=${page}`)
    }
    async getSeries(page: number): Promise<MediaType> {
        return this.axiosInstance.get(`/trending${TV}/day?page=${page}`)
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
    async getDataTrailerSeries(serie_id: number): Promise<TrailerType> {
        return this.axiosInstance.get(`${TV}/${serie_id}/videos`)
    }
    async addToFavorites(acount_id: number, raw_body: RawBodyType): Promise<any> {
        return this.axiosInstance.post(`/account/${acount_id}/favorite`, raw_body)
    }
    async getFavorites(acount_id: number, page: number): Promise<any> {
        return this.axiosInstance.get(`/account/${acount_id}/favorite/movies?page=${page}`)
    }
    async getFavoritesSeries(acount_id: number, page: number): Promise<any> {
        return this.axiosInstance.get(`/account/${acount_id}/favorite/tv?page=${page}`)
    }
}
export default new NobreTvService()