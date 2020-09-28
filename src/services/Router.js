'use strict';

import Routes from '../consts/routes.js';
import EventBus from './EventBus.js';
import Events from '../consts/events.js';

/**
 * Занимается роутингом приложения и работает с History API
 * @class
 */
class Router {
    constructor() {
        this.routes = {};

        EventBus.on(Events.PathChanged, this.onPathChanged.bind(this));
    }

    register(path, controller) {
        this.routes[path] = controller;

        return this;
    }

    start() {
        window.addEventListener('popstate', () => {
            this.go(window.location.pathname);
        });

        this.go(window.location.pathname);
    }

    go(path) {
        if (this.currentController) {
            this.currentController.switchOff();
        }

        this.currentController = this.routes[path];

        if (!this.currentController) {
            path = Routes.MainPage;
            this.currentController = this.routes[Routes.MainPage];
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, null, path);
        }

        this.currentController.switchOn();
    }

    onPathChanged(data) {
        this.go(data.path);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

export default Router;
