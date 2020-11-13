'use strict';

import ContentService from './ContentService';
import Routes from '../consts/routes';
import eventBus from './EventBus';
import Events from '../consts/events';
import {CustomObject} from '../tools/type';
import Controller from '../controllers/Controller';
import {ParseUrlParam} from '../tools/helper';

interface RoutObjectType {
    reg: RegExp,
    controller: Controller,
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
    register(path: string, controller: Controller) {
        const reg = new RegExp('^' + path.replace(/(:\w+)/, '(\\d+)?') + '.*$'); //eslint-disable-line

        const obj: RoutObjectType = {
            reg: reg,
            controller: controller,
        };

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
        let targetController: Controller = null;

        const result = this.getParam(path);
        this.routes.forEach(({reg, controller}) => {
            const res = result.path.match(reg);

            if (res) {
                targetController = controller;
            }
        });

        return {
            controller: targetController,
            path: {
                resourceId: +result.pathParams,
            },
            query: result.getParams,
        };
    }

    getParam(path: string) {
        const reg = new RegExp('^(/\\w+)(/(\\w+))?\\??((\\w+=\\w+&)*\\w+=\\w+)?$');
        const result = path.match(reg);
        // result[0] - все совпадение
        // result[1] - путь (/movies) - без path-параметров
        // result[3] - path-параметр(один)
        // result[4] - query-парамтры

        let getParams = null;
        let pathParams = null;
        let resultPath;

        if (result) {
            resultPath = `${result[1]}`;

            if (result[3]) {
                pathParams = result[3];
                resultPath = `${result[1]}/${pathParams}`;
            }

            if (result[4]) {
                getParams = ParseUrlParam(result[4]);
            }

            if (getParams && getParams.has('cid')) {
                resultPath = `/content/${getParams.get('cid')}`;
                pathParams = getParams.get('cid');
            }
        }

        return {
            path: resultPath,
            pathParams: pathParams,
            getParams: getParams,
        };
    }

    start() {
        window.addEventListener('popstate', () => {
            this.go(window.location.pathname + window.location.search);
        });

        this.go(window.location.pathname + window.location.search);
    }

    /**
     * @function
     * Включает нужный контролер
     * @param {string} path - Путь, из которого нужно вытащить данные запроса
     * @param {Object} data
     */
    go(path: string, data = {}) {
        const routeData = this.getRouteData(path);

        if (this.currentController === routeData.controller && !routeData.query) {
            this.currentController.switchOff();
            this.currentController.switchOn();
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
