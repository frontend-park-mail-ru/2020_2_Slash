import {SERVER_API_V1_PREFIX} from '../consts/settings.ts';

/**
 * @class
 * Класс для работы с сетью - делает http запросы
 */
class Http {
    /**
     * Создает экземпляр Http или возвращает его
     *
     * @constructor
     * @this  {Http}
     */
    constructor() {
        if (Http.__instance) {
            return Http.__instance;
        }

        Http.__instance = this;

        this.prefix = SERVER_API_V1_PREFIX;
    }

    /**
     * @function
     * Делает асинхронный get запрос
     * @return  {Promise}
     * @param {Object} route - Путь, по которому нужно сделать запрос
     */
    fetchGet({route}) {
        return this.fetchRequest({
            method: 'GET',
            route: route,
        });
    }

    /**
     * @function
     * Делает асинхронный post запрос
     * @return  {Promise}
     * @param {Object} route - Путь, по которому нужно сделать запрос
     */
    fetchPost({route, body}) {
        return this.fetchRequest({
            method: 'POST',
            route: route,
            body: body,
        });
    }

    /**
     * @function
     * Делает асинхронный put запрос
     * @return  {Promise}
     * @param {Object} route - Путь, по которому нужно сделать запрос
     */
    fetchPut({route, body}) {
        return this.fetchRequest({
            method: 'PUT',
            route: route,
            body: body,
        });
    }

    /**
     * @function
     * Делает асинхронный delete запрос
     * @return  {Promise}
     * @param {Object} route - Путь, по которому нужно сделать запрос
     */
    fetchDelete({route, body}) {
        return this.fetchRequest({
            method: 'DELETE',
            route: route,
            body: body,
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
        const options = {
            method: method,
            mode: 'cors',
            credentials: 'include',
        };

        if (body) {
            options.headers = {
                'Content-Type': 'application/json',
            };
            options.body = body;
        }

        return fetch(`${this.prefix}${route}`, options);
    }
}

export default new Http();
