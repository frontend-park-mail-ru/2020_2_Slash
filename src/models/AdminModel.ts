import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';
import {ContRequest, SeasonRequest, EpisodeRequest} from './Requests';
import {SERVER_API_V1_PREFIX} from '../consts/settings';

class AdminModel {
    constructor() {}

    createMovie(data: ContRequest) {
        return http.fetchPost({
            route: `${ApiMethods.Movies}`,
            body: JSON.stringify({...data}),
        }).then((response: Response) => response.json());
    }

    uploadPosters(small: File, large: File, id: number) {
        const formData = new FormData();
        formData.append('small_poster', small);
        formData.append('large_poster', large);

        return fetch(`${SERVER_API_V1_PREFIX}${ApiMethods.Content}/${id}/poster`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'X-Csrf-Token': localStorage.getItem('X-Csrf-Token'),
            },
            body: formData,
        }).then((response: Response) => response.json());
    }

    createTVShow(data: ContRequest) {
        return http.fetchPost({
            route: `${ApiMethods.TVShows}`,
            body: JSON.stringify({...data}),
        }).then((response: Response) => response.json());
    }

    createSeason(data: SeasonRequest) {
        return http.fetchPost({
            route: `${ApiMethods.Seasons}`,
            body: JSON.stringify({...data}),
        }).then((response: Response) => response.json());
    }

    createEpisode(data: EpisodeRequest) {
        return http.fetchPost({
            route: `${ApiMethods.Episodes}`,
            body: JSON.stringify({...data}),
        }).then((response: Response) => response.json());
    }

    uploadEpisodePoster(poster: File, id: number) {
        const formData = new FormData();
        formData.append('poster', poster);

        return fetch(`${SERVER_API_V1_PREFIX}${ApiMethods.Episodes}/${id}/poster`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'X-Csrf-Token': localStorage.getItem('X-Csrf-Token'),
            },
            body: formData,
        }).then((response: Response) => response.json());
    }

    createActor(actor: any) {
        return http.fetchPost({
            route: `${ApiMethods.Actors}`,
            body: JSON.stringify({name: actor}),
        }).then((response: Response) => response.json());
    }

    createGenre(genre: any) {
        return http.fetchPost({
            route: `${ApiMethods.Genres}`,
            body: JSON.stringify({name: genre}),
        }).then((response: Response) => response.json());
    }

    createDirector(director: any) {
        return http.fetchPost({
            route: `${ApiMethods.Directors}`,
            body: JSON.stringify({name: director}),
        }).then((response: Response) => response.json());
    }

    createCountry(country: any) {
        return http.fetchPost({
            route: `${ApiMethods.Countries}`,
            body: JSON.stringify({name: country}),
        }).then((response: Response) => response.json());
    }

    getActors() {
        return http.fetchGet({
            route: `${ApiMethods.Actors}`,
        }).then((response: Response) => response.json());
    }

    getDirectors() {
        return http.fetchGet({
            route: `${ApiMethods.Directors}`,
        }).then((response: Response) => response.json());
    }

    getCountries() {
        return http.fetchGet({
            route: `${ApiMethods.Countries}`,
        }).then((response: Response) => response.json());
    }
}

export default new AdminModel();
