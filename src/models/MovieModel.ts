import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';

class MovieModel {
    constructor() {}

    getMovie(data: any) {
        return http.fetchGet({
            route: `${ApiMethods.Movies}/${data.id}`,
        }).then((response: Response) => response.json());
    }

    getTopMovies(count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.TopMovies}?count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }

    getLatestMovies(count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.LatestMovies}?count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }

    getMoviesByGenre(id: number, count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.Movies}?genre=${id}&count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }

    getMoviesByActor(id: number, count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.Movies}?actor=${id}&count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }
}

export default new MovieModel();
