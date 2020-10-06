import {SERVER_API_V1_PREFIX} from '../consts/settings.js';

class Http {
    constructor() {
        if (Http.__instance) {
            return Http.__instance;
        }

        Http.__instance = this;

        this.prefix = SERVER_API_V1_PREFIX;
    }

    fetchGet({route}) {
        return this.fetchRequest({
            method: 'GET',
            route: route
        });
    }

    fetchPost({route, body}) {
        return this.fetchRequest({
            method: 'POST',
            route: route,
            body: body
        });
    }

    fetchPut({route, body}) {
        return this.fetchRequest({
            method: 'PUT',
            route: route,
            body: body
        });
    }

    fetchDelete({route, body}) {
        return this.fetchRequest({
            method: 'DELETE',
            route: route,
            body: body
        });
    }

    fetchRequest({
                     route = '/',
                     method = 'GET',
                     body = null
                 }) {
        const options = {
            method: method,
            mode: 'no-cors',
            credentials: 'include'
        };

        if (body) {
            options.headers = {
                'Content-Type': 'application/json'
            };
            options.body = body;
        }

        return fetch(`${this.prefix}${route}`, options);
    }
}

export default new Http();
