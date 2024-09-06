import axios from 'axios'
import { MOVIE } from './shared/path-rest-constants'
import { TV } from './shared/path-rest-constants'
import type { MediaType } from '../types/MediaType'
import type { AboutMediaType } from '@/types/AboutMediaType'




class NobreTvService {
    private bearer: string = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzg0ZTdhMWYwMjJhN2VkZjMzZWIxYmFhMmFhNzNmYSIsIm5iZiI6MTcyNTQ5MDQxMy41Mzc5MjMsInN1YiI6IjY2ZDhlMDgzNzA5ZmJlYmU0MjFhYmYxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ad3435cKP07ttCTev_wDNHWRttN0h_N4Wb8Lpxh2fuE'
    private url: string = 'https://api.themoviedb.org/3';
    private axiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.url,
            headers: {
                'Authorization': this.bearer
            }
        });
    }

    async getAll(): Promise<MediaType> {
        return this.axiosInstance.get('trending/all/day')
    }

    async getMovies(): Promise<MediaType> {
        return this.axiosInstance.get(`discover${MOVIE}`)
    }

    async getSeries(): Promise<MediaType> {
        return this.axiosInstance.get(`/discover${TV}`)
    }
    async getMovieById(id: number): Promise<AboutMediaType> {
        return this.axiosInstance.get(`movie/${id}`)
    }
    async getSeriesById(id: number): Promise<AboutMediaType> {
        return this.axiosInstance.get(`tv/${id}`)
    }
}

export default new NobreTvService();