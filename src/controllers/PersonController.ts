import Controller from './Controller';
import ModalService from '../services/ModalService';
import Events from '../consts/events';
import eventBus from '../services/EventBus';
import SubMenuPopup from '../components/SubMenuPopup/SubMenuPopup';
import MovieModel from '../models/MovieModel';
import {Error} from '../consts/errors';
import Context from '../tools/Context';
import ActorModel from '../models/ActorModel';
import PersonView from '../views/PersonView/PersonView';
import TVShowsModel from '../models/TVShowsModel';

class PersonController extends Controller {
    view: PersonView;

    constructor() {
        super(new PersonView());
    }

    switchOn(data: any = {}) {
        if (data.path.path.includes('actor')) {
            Promise.all([
                MovieModel.getMoviesByActor(data.path.resourceId, 15),
                TVShowsModel.getTVShowsByActor(data.path.resourceId, 15),
                ActorModel.getActor({id: data.path.resourceId}),
            ]).then(([moviesResponse, tvShowsResponse, actorResponse]) => {
                if (moviesResponse.error || actorResponse.error) {
                    return;
                }
                eventBus.emit(Events.CheckSession, {});

                const {tvshows} = tvShowsResponse.body;
                const {movies} = moviesResponse.body;

                const contentData: Context = {
                    content: movies.concat(tvshows),
                    actor: actorResponse.body.actor.name,
                };

                this.view.insertIntoContext(contentData);
                this.view.show();
            }).catch((error: Error) => console.log(error));
        } else if (data.path.path.includes('director')) {
            Promise.all([
                MovieModel.getMoviesByDirector(data.path.resourceId, 15),
                TVShowsModel.getTVShowsByDirector(data.path.resourceId, 15),
                ActorModel.getDirector({id: data.path.resourceId}),
            ]).then(([moviesResponse, tvShowsResponse, directorResponse]) => {
                if (moviesResponse.error || directorResponse.error) {
                    return;
                }
                eventBus.emit(Events.CheckSession, {});

                const {tvshows} = tvShowsResponse.body;
                const {movies} = moviesResponse.body;

                const contentData: Context = {
                    content: movies.concat(tvshows),
                    director: directorResponse.body.director.name,
                };

                this.view.insertIntoContext(contentData);
                this.view.show();
            }).catch((error: Error) => console.log(error));
        }
    }

    onSwitchOn(data: any = {}) {
        super.onSwitchOn();
        if (data.modalStatus) {
            ModalService.show(data.modalStatus);
        }
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }

    onOpenSubMenuGenres = () => {
        const subMenu = new SubMenuPopup({}, document.querySelector('.genres'));
        this.view.insertIntoContext({SubMenu: subMenu.render()});
    }
}

export default PersonController;
