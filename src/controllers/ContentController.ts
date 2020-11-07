import Controller from './Controller';
import MainView from '../views/MainVIew/MainView';
import Routes from '../consts/routes';
import EventBus from '../services/EventBus';
import Events from '../consts/events';

/**
 * @class
 * Контроллер для главной страницы
 */
class ContentController extends Controller {
    constructor() {
        super(new MainView());
    }

    switchOn(data: any = {}) {
        const callbackData: any = {
            path: Routes.MainPage,
        };

        EventBus.emit(Events.PathChanged, callbackData);
        EventBus.emit(Events.ContentByExternalReference, {id: data.query.resourceId});

        this.onSwitchOn(data);
    }

    switchOff() {
        super.switchOff();
    }
}

export default ContentController;
