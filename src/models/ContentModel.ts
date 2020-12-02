import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';

class ContentModel {
    constructor() {
    }

    getGenres() {
        return http.fetchGet({
            route: `${ApiMethods.Genres}`,
        }).then((response: Response) => response.json());
    }

    getRating(data: any) {
        return http.fetchGet({
            route: `${ApiMethods.Movies}/${data.id}${ApiMethods.Rating}`,
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

    search(query: string, count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.Search}?q=${query}&count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }
}

export default new ContentModel();
