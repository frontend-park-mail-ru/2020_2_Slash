import './index.css';
import Router from './services/Router.ts';
import Routes from './consts/routes.ts';
import MainController from './controllers/MainController';
import ProfileController from './controllers/ProfileController';
import SignupController from './controllers/SignUpController';
import LoginController from './controllers/LoginController';
import PlayerController from './controllers/PlayerController';
import MoviesController from './controllers/MoviesController';

const app = document.querySelector('.application');
(new Router(app))
    .register(Routes.MainPage, new MainController)
    .register(Routes.ProfilePage, new ProfileController)
    .register(Routes.SignUpPage, new SignupController)
    .register(Routes.LoginPage, new LoginController)
    .register(Routes.Watch, new PlayerController)
    .register(Routes.MoviePage, new MoviesController)
    .start();
