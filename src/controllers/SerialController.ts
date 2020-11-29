import Controller from './Controller';
import SerialView from '../views/SerialView/SerialView';
import ModalService from '../services/ModalService';
import Events from '../consts/events';
import eventBus from '../services/EventBus';
import SubMenuPopup from '../components/SubMenuPopup/SubMenuPopup';
import {Genres} from '../consts/genres';
import TVShowsModel from '../models/TVShowsModel';
import {Error} from '../consts/errors';
import selectRandomMovie from '../tools/selectRandom';
import Context from '../tools/Context';
import {GetGenreNameById} from '../tools/helper';

interface ContextData {
    preview: { [key: string]: string },
    singleGenre: boolean,
    blocks: { [key: string]: string }[],
    genre: string;
}

/**
 * @class
 * Контроллер для главной страницы
 */
class SerialController extends Controller {
    view: SerialView;

    constructor() {
        super(new SerialView());
    }

    switchOn(data: any = {}) {
        eventBus.on(Events.OpenSubMenuGenres, this.onOpenSubMenuGenres.bind(this));

        if (data.query && data.query.has('genre')) {
            this.showGenrePage(data.query.get('genre'));
            return;
        }

        Promise.all([
            TVShowsModel.getTVShowsByGenre(Genres.actions.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.comedies.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.dramas.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.melodramas.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.adventures.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.animation.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.criminal.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.detective.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.fantastic.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.fantasy.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.horrors.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.military.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.thrillers.id, 15),
            TVShowsModel.getTVShowsByGenre(Genres.western.id, 15),
        ]).then(([actionResponse, comediesResponse, dramasResponse, melodramasResponse,
            advResponse, animResponse, crimeResponse, detectResponse, fantasticResponse, fanResponse,
            horrResponse, militResponse, thrillResponse, westResponse]) => {
            if (actionResponse.error || comediesResponse.error ||
                dramasResponse.error || melodramasResponse.error) {
                return;
            }

            const randomMovie = selectRandomMovie([
                actionResponse.body.tvshows || [],
                comediesResponse.body.tvshows || [],
                dramasResponse.body.tvshows || [],
                melodramasResponse.body.tvshows || [],
                advResponse.body.tvshows || [],
                animResponse.body.tvshows || [],
                crimeResponse.body.tvshows || [],
                detectResponse.body.tvshows || [],
                fantasticResponse.body.tvshows || [],
                fanResponse.body.tvshows || [],
                horrResponse.body.tvshows || [],
                militResponse.body.tvshows || [],
                thrillResponse.body.tvshows || [],
                westResponse.body.tvshows || [],
            ],
            );

            const contentData: ContextData = {
                genre: null,
                singleGenre: false,
                preview: randomMovie,
                blocks: [
                    {
                        title: Genres.actions.name,
                        content: actionResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.comedies.name,
                        content: comediesResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.dramas.name,
                        content: dramasResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.melodramas.name,
                        content: melodramasResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.western.name,
                        content: westResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.thrillers.name,
                        content: thrillResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.military.name,
                        content: militResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.horrors.name,
                        content: horrResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.fantasy.name,
                        content: fanResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.fantastic.name,
                        content: fantasticResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.detective.name,
                        content: detectResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.criminal.name,
                        content: crimeResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.animation.name,
                        content: animResponse.body.tvshows || [],
                    },
                    {
                        title: Genres.adventures.name,
                        content: advResponse.body.tvshows || [],
                    },
                ],
            };

            this.view.insertIntoContext(contentData);
            this.view.show();
            this.onSwitchOn(data);
        }).catch((error: Error) => console.log(error));
    }

    onSwitchOn(data: any = {}) {
        super.onSwitchOn();

        if (data.modalStatus) {
            ModalService.show(data.modalStatus);
        }
    }

    switchOff() {
        eventBus.off(Events.OpenSubMenuGenres, this.onOpenSubMenuGenres.bind(this));
        super.switchOff();
        this.view.hide();
    }

    showGenrePage = (index: number) => {
        const genre = GetGenreNameById(index);
        TVShowsModel.getTVShowsByGenre(index, 15).then((response) => {
            if (response.error) {
                return;
            }

            eventBus.emit(Events.CheckSession, {});

            const contentData: Context = {
                content: response.body.tvshows || [],
                genre: genre,
                singleGenre: true,
            };

            this.view.insertIntoContext(contentData);
            this.view.show();
        }).catch((error: Error) => console.log(error));
    }

    onOpenSubMenuGenres() {
        const subMenu = new SubMenuPopup({contentType: 'serials'}, document.querySelector('.genres'));
        this.view.insertIntoContext({SubMenu: subMenu.render()});
    }
}

export default SerialController;
