'use strict';

import ContentService from './ContentService.js';
import Routes from '../consts/routes.ts';
import EventBus from './EventBus.js';
import Events from '../consts/events.ts';

/**
 * Занимается роутингом приложения и работает с History API
 * @class
 */
class Router {
    /**
     * Создает экземпляр Router
     *
     * @constructor
     * @this  {Router}
     * @param {Node} app - Родительский элемент элемента
     */
    constructor(app) {
        this.application = app;
        this.routes = [];

        EventBus.on(Events.PathChanged, this.onPathChanged.bind(this));
        EventBus.on(Events.RedirectBack, this.back.bind(this));

        this.application.addEventListener('click', function(e) {
            const {target} = e;

            const closestLink = target.closest('a');
            const closestButton = target.closest('button');
            if (closestLink instanceof HTMLAnchorElement) {
                e.preventDefault();

                const data = Object.assign({}, closestLink.dataset);

                data.path = closestLink.getAttribute('href');

                EventBus.emit(data.event, data);
            } else if (closestButton instanceof HTMLButtonElement) {
                e.preventDefault();

                const data = Object.assign({}, closestButton.dataset);
                EventBus.emit(data.event, data);
            } else if (target instanceof HTMLMediaElement) {
                EventBus.emit(target.dataset.event, {});
            }
        });
    }

    /**
     * @function
     * Регистрирует путь - добавляет в массив класса роутера путь
     * @return  {this}
     * @param {string} path - Путь, который нужно добавить
     * @param {Object} controller - Контроллер, которыц соответствует этому пути
     */
    register(path, controller) {
        const reg = new RegExp('^' + path.replace(/(:\w+)/, '(\\d+)') + '\/?$');

        this.routes.push({
            reg: reg,
            controller: controller,
        });

        return this;
    }

    /**
     * @function
     * Проверяет пришедший путь и достает из него данные запроса
     * @return  {Object, string} controller, query
     * @param {string} path - Путь, из которого нужно вытащить данные запроса
     */
    getRouteData(path) {
        let targetController = null;
        const query = {};

        this.routes.forEach(({reg, controller}) => {
            const res = path.match(reg);

            if (res) {
                const data = res.slice(1)[0];

                if (data) {
                    query.resourceId = +data;
                }

                targetController = controller;
            }
        });

        return {
            controller: targetController,
            query: query,
        };
    }

    start() {
        window.addEventListener('popstate', (event) => {
            this.go(window.location.pathname);
        });

        this.go(window.location.pathname);
    }

    /**
     * @function
     * Включает нужный контролер
     * @param {string} path - Путь, из которого нужно вытащить данные запроса
     * @param {Object} data
     */
    go(path, data = {}) {
        const routeData = this.getRouteData(path);

        if (this.currentController) {
            this.currentController.switchOff();
        }

        this.currentController = routeData.controller;

        if (!this.currentController) {
            path = Routes.MainPage;
            this.currentController = this.getRouteData(path).controller;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, null, path);
        }

        data = routeData.query ? Object.assign(data, routeData.query) : data;
        this.currentController.switchOn(data);
    }

    /**
     * @function
     * Колбэк на изменение пути
     * @param {Object} data - Данные для этого коллбэка
     */
    onPathChanged(data) {
        this.go(data.path, data.misc || {});
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

export default Router;
