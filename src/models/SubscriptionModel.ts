import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';

class SubscriptionModel {
    constructor() {}

    checkSubscription() {
        return http.fetchGet({
            route: `${ApiMethods.Subscription}`,
        }).then((response: Response) => response.json());
    }

    deleteSubscription() {
        return http.fetchDelete({
            route: ApiMethods.Subscription,
        }).then((response: Response) => {
            return response.json();
        });
    }

    addSubscription(data: any) {
        return http.fetchDelete({
            route: ApiMethods.Subscription,
            body: JSON.stringify({...data}),
        }).then((response: Response) => {
            localStorage.setItem('X-Csrf-Token', response.headers.get('X-Csrf-Token'));
            return response.json();
        });
    }
}

export default new SubscriptionModel();
