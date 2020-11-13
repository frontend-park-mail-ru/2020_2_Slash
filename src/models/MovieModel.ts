import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';

class MovieModel {
    constructor() {}

    getMovie(data: any) {
        return http.fetchGet({
            route: `${ApiMethods.Movies}/${data.id}`,
        }).then((response: Response) => response.json());
    }

    getRating(data: any) {
        return http.fetchGet({
            route: `${ApiMethods.Movies}/${data.id}${ApiMethods.Rating}`,
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

    getGenres() {
        return http.fetchGet({
            route: `${ApiMethods.Genres}`,
        }).then((response: Response) => response.json());
    }

    getFavourites() {
        return http.fetchGet({
            route: ApiMethods.FavouritesMovies,
        }).then((response: Response) => response.json());
    }

    addToFavourites(id: number) {
        return http.fetchPost({
            route: `${ApiMethods.FavouritesMovies}`,
            body: JSON.stringify({content_id: id}),
        }).then((response: Response) => response.json());
    }

    removeFromFavourites(id: number) {
        return http.fetchDelete({
            route: `${ApiMethods.FavouritesMovies}`,
            body: JSON.stringify({content_id: id}),
        }).then((response: Response) => response.json());
    }

    addVote(id: number, vote: boolean) {
        return http.fetchPost({
            route: `${ApiMethods.Rating}/${id}`,
            body: JSON.stringify({likes: vote}),
        }).then((response: Response) => response.json());
    }

    changeVote(id: number, vote: boolean) {
        return http.fetchPut({
            route: `${ApiMethods.Rating}/${id}`,
            body: JSON.stringify({likes: vote}),
        }).then((response: Response) => response.json());
    }

    removeVote(id: number) {
        return http.fetchDelete({
            route: `${ApiMethods.Rating}/${id}`,
        }).then((response: Response) => response.json());
    }
}

export default new MovieModel();
