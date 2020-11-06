import Controller from './Controller';
import MainView from '../views/MainVIew/MainView';
import Routes from '../consts/routes';
import Modals from '../consts/modals';
import EventBus from '../services/EventBus';
import Events from '../consts/events';
import ModalService from '../services/ModalService';

/**
 * @class
 * Контроллер для главной страницы
 */
class MainController extends Controller {
    constructor() {
        super(new MainView());
    }

    switchOn(data: any = {}) {
        const callbackData: any = {
            path: Routes.MainPage,
        };

        callbackData.misc = {
            modalStatus: Modals.contentPage,
        };

        EventBus.emit(Events.PathChanged, callbackData);

        this.onSwitchOn(data);
    }

    onSwitchOn(data: any = {}) {
        data.modalStatus = Modals.contentPage;
        ModalService.show(data);
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }
}

export default MainController;
