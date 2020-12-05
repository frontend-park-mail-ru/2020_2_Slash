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

class PersonController extends Controller {
    view: PersonView;

    constructor() {
        super(new PersonView());
    }

    switchOn(data: any = {}) {
        Promise.all([
            MovieModel.getMoviesByActor(data.path.resourceId, 15),
            ActorModel.getActor({id: data.path.resourceId}),
        ]).then(([moviesResponse, actorResponse]) => {
            if (moviesResponse.error || actorResponse.error) {
                return;
            }
            eventBus.emit(Events.CheckSession, {});

            const contentData: Context = {
                content: moviesResponse.body.movies || [],
                actor: actorResponse.body.actor.name,
            };

            this.view.insertIntoContext(contentData);
            this.view.show();
        }).catch((error: Error) => console.log(error));
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