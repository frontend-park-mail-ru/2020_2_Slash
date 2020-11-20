import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';

class ActorModel {
    constructor() {}

    getActor(data: any) {
        return http.fetchGet({
            route: `${ApiMethods.Actors}/${data.id}`,
        }).then((response: Response) => response.json());
    }
}

export default new ActorModel();
