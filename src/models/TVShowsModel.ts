import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';

class TVShowsModel {
    constructor() {}

    getTVShow(id: number) {
        return http.fetchGet({
            route: `${ApiMethods.TVShows}/${id}`,
        }).then((response: Response) => response.json());
    }

    getTVShowsByGenre(id: number, count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.TVShows}?genre=${id}&count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }

    getTVShowsByActor(id: number, count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.TVShows}?actor=${id}&count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }

    getTVShowsByDirector(id: number, count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.TVShows}?director=${id}&count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }

    getTopTVShows(count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.TopTVShows}?count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }

    getLatestTVShows(count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.LatestTVShows}?count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }

    getSeasons(id: number) {
        return http.fetchGet({
            route: `${ApiMethods.TVShows}/${id}/episodes`,
        }).then((response: Response) => response.json());
    }
}

export default new TVShowsModel();
