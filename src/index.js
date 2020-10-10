import './index.css';
import Router from './services/Router.js';
import Routes from './consts/routes.js';
import MainController from './controllers/MainController.js';
import ProfileController from './controllers/ProfileController.js';
import SignupController from './controllers/SignUpController.js';
import LoginController from './controllers/LoginController.js';

const app = document.querySelector('.application');
(new Router(app))
    .register(Routes.MainPage, new MainController)
    .register(Routes.ProfilePage, new ProfileController)
    .register(Routes.SignUpPage, new SignupController)
    .register(Routes.LoginPage, new LoginController)
    .start();
