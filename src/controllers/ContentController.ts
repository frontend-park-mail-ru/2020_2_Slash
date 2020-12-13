import Controller from './Controller';
import MainView from '../views/MainVIew/MainView';
import EventBus from '../services/EventBus';
import Events from '../consts/events';
import Types from '../consts/contentType';
import routes from '../consts/routes';

/**
 * @class
 * Контроллер для главной страницы
 */
class ContentController extends Controller {
    constructor() {
        super(new MainView());
    }

    switchOn(data: any = {}) {
        let pathWithoutCid;

        const sidIndex = window.location.search.lastIndexOf(`sid=${data.path.resourceId}`);
        if (sidIndex > 0) {
            pathWithoutCid = window.location.search.slice(0, sidIndex - 1);
        }

        const midIndex = window.location.search.lastIndexOf(`mid=${data.path.resourceId}`);
        if (midIndex > 0) {
            pathWithoutCid = window.location.search.slice(0, midIndex - 1);
        }

        let path = window.location.pathname;
        if (window.location.pathname === routes.MyList) {
            if (localStorage.getItem('authorized') == 'false') {
                path = routes.MainPage;
            }
        }

        const callbackData: any = {
            path: path  + pathWithoutCid,
        };

        let contentType = Types.Movie;
        if (window.location.search.search('sid') > 0) {
            contentType = Types.TVShow;
        }
        EventBus.emit(Events.PathChanged, callbackData);
        EventBus.emit(Events.ContentByExternalReference, {id: data.path.resourceId, type: contentType});

        this.onSwitchOn(data);
    }

    switchOff() {
        super.switchOff();
    }
}

export default ContentController;
