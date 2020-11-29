import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';

class TVShowsModel {
    constructor() {}

    getTVShow(data: any) {
        return http.fetchGet({
            route: `${ApiMethods.TVShows}/${data.id}`,
        }).then((response: Response) => response.json());
    }

    getTVShowsByGenre(id: number, count: number, from = 0) {
        return http.fetchGet({
            route: `${ApiMethods.TVShows}?genre=${id}&count=${count}&from=${from}`,
        }).then((response: Response) => response.json());
    }
}

export default new TVShowsModel();
