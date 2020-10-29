'use strict';

import ContentService from './ContentService';
import Routes from '../consts/routes';
import eventBus from './EventBus';
import Events from '../consts/events';
import Modals from "../consts/modals";
import {CustomObject} from "../tools/type";

interface RoutObjectType {
    reg: RegExp,
    controller: object,
}

interface QueryType {
    resourceId: number,
}

interface onPathChangeDataType {
    event: string,
    path: string,
    misc: CustomObject,
}

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

    private application: HTMLElement;
    private routes: RoutObjectType[];
    private currentController: any;
    private contentService: ContentService;

    constructor(app: HTMLElement) {
        this.application = app;
        this.routes = [];

        this.contentService = ContentService.getInstance();

        eventBus.on(Events.PathChanged, this.onPathChanged.bind(this));
        eventBus.on(Events.RedirectBack, this.back.bind(this));
        eventBus.on(Events.PathChanged, this.onPathChanged.bind(this));

        this.application.addEventListener('click', (e: Event) => {
            const target = <HTMLInputElement>e.target;

            const closestLink: HTMLElement = target.closest('a');
            const closestButton: HTMLElement = target.closest('button');
            if (closestLink instanceof HTMLAnchorElement) {
                e.preventDefault();

                const data = {...closestLink.dataset};

                data.path = closestLink.getAttribute('href');
                eventBus.emit(data.event, data);
            } else if (closestButton instanceof HTMLButtonElement) {
                e.preventDefault();

                const data = {...closestButton.dataset};
                eventBus.emit(data.event, data);
            } else if (target instanceof HTMLMediaElement) {
                eventBus.emit(target.dataset.event);
            }
        });
    }

    /**
     * @function
     * Регистрирует путь - добавляет в массив класса роутера путь
     * @return  {this}
     * @param {string} path - Путь, который нужно добавить
     * @param {Object} controller - Контроллер, который соответствует этому пути
     */
    register(path: string, controller: object) {
        const reg = new RegExp('^' + path.replace(/(:\w+)/, '(\\d+)') + '\/?$');

        const obj: RoutObjectType = {
            reg: reg,
            controller: controller,
        }
        this.routes.push(obj);

        return this;
    }

    /**
     * @function
     * Проверяет пришедший путь и достает из него данные запроса
     * @return  {Object, string} controller, query
     * @param {string} path - Путь, из которого нужно вытащить данные запроса
     */
    getRouteData(path: string) {
        let targetController: object = null;
        let query: QueryType = {resourceId: 0};

        this.routes.forEach(({reg, controller}) => {
            const res = path.match(reg);

            if (res) {
                const data: string = res.slice(1)[0];

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
    go(path: string, data = {}) {
        const routeData = this.getRouteData(path);

        if (this.currentController === routeData.controller) {
            eventBus.emit(Events.UpdateUserInfo, data);
            return;
        }

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

        data = {...data, ...routeData};
        this.currentController.switchOn(data);
    }

    /**
     * @function
     * Колбэк на изменение пути
     * @param {Object} data - Данные для этого коллбэка
     */
    onPathChanged(data: onPathChangeDataType) {
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
