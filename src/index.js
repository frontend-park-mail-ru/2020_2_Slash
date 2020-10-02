import Router from './services/Router.js';
import Routes from './consts/routes.js';
import MainController from './controllers/MainController.js';
import ProfileController from './controllers/ProfileController.js';

const app = document.querySelector('.application');
(new Router(app))
    .register(Routes.MainPage, new MainController)
    .register(Routes.ProfilePage, new ProfileController)
    .start();
