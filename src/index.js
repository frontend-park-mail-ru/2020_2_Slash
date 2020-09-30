import Router from './services/Router.js';
import Routes from './consts/routes.js';
import MainController from './controllers/MainController.js';

(new Router)
    .register(Routes.MainPage, new MainController)
    .start();
