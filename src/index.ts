import './index.scss';
import Router from './services/Router';
import Routes from './consts/routes';
import MainController from './controllers/MainController';
import LoginController from './controllers/LoginController';
import ContentController from './controllers/ContentController';
import ProfileController from './controllers/ProfileController';
import SignupController from './controllers/SignUpController';
import PlayerController from './controllers/PlayerController';
import MoviesController from './controllers/MoviesController';
import MyListController from './controllers/MyListController';
import PersonController from './controllers/PersonController';
import SearchController from './controllers/SearchController';
import SerialController from './controllers/SerialController';
import FreeContentController from './controllers/FreeContentController';

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then();
}

const app: HTMLElement = document.querySelector('.application');
(new Router(app))
    .register(Routes.MainPage, new MainController)
    .register(Routes.ProfilePage, new ProfileController)
    .register(Routes.SignUpPage, new SignupController)
    .register(Routes.LoginPage, new LoginController)
    .register(Routes.Watch, new PlayerController)
    .register(Routes.MoviePage, new MoviesController)
    .register(Routes.MyList, new MyListController)
    .register(Routes.ContentPageSerial, new ContentController)
    .register(Routes.ContentPageMovie, new ContentController)
    .register(Routes.Actor, new PersonController)
    .register(Routes.Director, new PersonController)
    .register(Routes.SearchPage, new SearchController())
    .register(Routes.Serials, new SerialController)
    .register(Routes.FreeContent, new FreeContentController)
    .start();
