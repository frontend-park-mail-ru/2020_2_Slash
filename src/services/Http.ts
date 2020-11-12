import {SERVER_API_V1_PREFIX} from '../consts/settings';

interface Options {
    method: string,
    mode: RequestMode,
    credentials: RequestCredentials,
    headers: HeadersInit,
    body: BodyInit,
}

interface Api {
    route : string,
    body?: string,
}

/**
 * @class
 * Класс для работы с сетью - делает http запросы
 */
class Http {
    private prefix : string = SERVER_API_V1_PREFIX;
    private CSRFtoken: string;

    /**
     * @function
     * Делает асинхронный get запрос
     * @return  {Promise}
     * @param api
     */
    fetchGet(api: Api) {
        return this.fetchRequest({
            method: 'GET',
            route: api.route,
        });
    }

    /**
     * @function
     * Делает асинхронный post запрос
     * @return  {Promise}
     * @param api
     */
    fetchPost(api: Api) {
        return this.fetchRequest({
            method: 'POST',
            route: api.route,
            body: api.body,
        });
    }

    /**
     * @function
     * Делает асинхронный put запрос
     * @return  {Promise}
     * @param api
     */
    fetchPut(api: Api) {
        return this.fetchRequest({
            method: 'PUT',
            route: api.route,
            body: api.body,
        });
    }

    /**
     * @function
     * Делает асинхронный delete запрос
     * @return  {Promise}
     * @param api
     */
    fetchDelete(api: Api) {
        return this.fetchRequest({
            method: 'DELETE',
            route: api.route,
            body: api.body,
        });
    }

    /**
     * @function
     * Метод, вызывающий fetch
     * @return  {Promise}
     * @param {{route: string, method: string, body: Object}}
     */
    fetchRequest({
        route = '/',
        method = 'GET',
        body = null,
    }) {
        const options: Options = {
            method: method,
            mode: 'cors',
            credentials: 'include',
            headers: {},
            body: null,
        };

        if (body) {
            options.headers = {
                'Content-Type': 'application/json',
                'X-Csrf-Token': localStorage.getItem('X-Csrf-Token'),
            };
            options.body = body;
        }

        return fetch(`${this.prefix}${route}`, options);
    }
}

export const http = new Http();
