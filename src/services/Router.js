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
        this.routes = {};

        EventBus.on(Events.PathChanged, this.onPathChanged.bind(this));

        this.application.addEventListener('click', function(e) {
            const {target} = e;

            const closest = target.closest('a');
            if (closest instanceof HTMLAnchorElement) {
                e.preventDefault();

                const data = Object.assign({}, closest.dataset);

                data.path = closest.getAttribute('href');

                EventBus.emit(data.event, data);
            }
        });

        this.application.addEventListener('submit', function(e)  {
            e.preventDefault();
        });
    }

    register(path, controller) {
        this.routes[path] = controller;

        return this;
    }

    start() {
        window.addEventListener('popstate', (event) => {
            this.go(window.location.pathname);
        });

        this.go(window.location.pathname);
    }

    go(path, data = {}) {
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
