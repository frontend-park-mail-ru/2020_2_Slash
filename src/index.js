import './index.css';
import Router from './services/Router.js';
import Routes from './consts/routes.ts';
import MainController from './controllers/MainController.js';
import ProfileController from './controllers/ProfileController.js';
import SignupController from './controllers/SignUpController.js';
import LoginController from './controllers/LoginController.js';
import PlayerController from './controllers/PlayerController';

const app = document.querySelector('.application');
(new Router(app))
    .register(Routes.MainPage, new MainController)
    .register(Routes.ProfilePage, new ProfileController)
    .register(Routes.SignUpPage, new SignupController)
    .register(Routes.LoginPage, new LoginController)
    .register(Routes.Watch, new PlayerController)
    .start();
