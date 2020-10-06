'use strict';

import Routes from '../consts/routes.js';
import EventBus from './EventBus.js';
import Events from '../consts/events.js';

/**
 * Занимается роутингом приложения и работает с History API
 * @class
 */
class Router {
    constructor(app) {
        this.application = app;
        this.routes = [];

        EventBus.on(Events.PathChanged, this.onPathChanged.bind(this));

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
                const data = Object.assign({}, closestButton.dataset);
                EventBus.emit(data.event, data);
            }
        });
    }

    register(path, controller) {
        const reg = new RegExp('^' + path.replace(/(:\w+)\/?/, '(\\d+)') + '$');

        this.routes.push({
            reg: reg,
            controller: controller,
        });

        return this;
    }

    getRouteData(path) {
        let targetController = null;
        let query = {};

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
        }
    }

    start() {
        window.addEventListener('popstate', (event) => {
            this.go(window.location.pathname);
        });

        this.go(window.location.pathname);
    }

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
