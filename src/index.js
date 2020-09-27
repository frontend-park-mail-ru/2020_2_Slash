import './index.css';
import Router from './services/Router.js';
import Paths from './consts/routes.js';
import MainController from './controllers/MainController.js';

(new Router)
    .register(Paths.MainPage, new MainController)
    .start();
