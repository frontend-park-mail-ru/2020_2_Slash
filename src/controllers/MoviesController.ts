import Controller from './Controller';
import MoviesView from '../views/MoviesView/MoviesView';
import ModalService from '../services/ModalService';
import Events from '../consts/events';
import eventBus from '../services/EventBus';

/**
 * @class
 * Контроллер для главной страницы
 */
class MoviesController extends Controller {
    view: MoviesView;

    constructor() {
        super(new MoviesView());

        eventBus.on(Events.OpenSubMenuGenres, this.onOpenSubMenuGenres);
    }

    switchOn(data: any = {}) {
        if (data.query.resourceId) {
            this.showGenrePage(data.query.resourceId);
            return;
        }
        const contentData = { // фейковый контент, пока не реализовали
            genres: [
                {name: 'аниме', id: 1}, {name: 'биографический', id: 2}, {name: 'боевик', id: 3},
                {name: 'вестерн', id: 4}, {name: 'военный', id: 5}, {name: 'детектив', id: 6},
                {name: 'детский', id: 9}, {name: 'документальный', id: 8},
            ],
            preview: {
                id: 1,
                poster: '/static/img/movie.webp',
                title: 'Фильм',
            },
            blocks: [
                {
                    title: 'Триллеры',
                    content: [
                        {
                            id: 1,
                            poster: '/static/img/witcher.webp',
                        },
                        {
                            id: 2,
                            poster: '/static/img/witcher.webp',
                        },
                        {
                            id: 3,
                            poster: '/static/img/witcher.webp',
                        },
                        {
                            id: 58746,
                            poster: '/static/img/witcher.webp',
                        },
                        {
                            id: 4,
                            poster: '/static/img/witcher.webp',
                        },
                        {
                            id: 5,
                            poster: '/static/img/witcher.webp',
                        },
                        {
                            id: 6,
                            poster: '/static/img/witcher.webp',
                        },
                    ],
                },
                {
                    title: 'Ужасы',
                    content: [
                        {
                            id: 7,
                            poster: '/static/img/fword.webp',
                        },
                        {
                            id: 8,
                            poster: '/static/img/fword.webp',
                        },
                        {
                            id: 9,
                            poster: '/static/img/fword.webp',
                        },
                        {
                            id: 10,
                            poster: '/static/img/fword.webp',
                        },
                        {
                            id: 11,
                            poster: '/static/img/fword.webp',
                        },
                        {
                            id: 12,
                            poster: '/static/img/fword.webp',
                        },
                        {
                            id: 13,
                            poster: '/static/img/fword.webp',
                        },
                    ],
                },
                {
                    title: 'Драмы',
                    content: [
                        {
                            id: 14,
                            poster: '/static/img/woman.webp',
                        },
                        {
                            id: 15,
                            poster: '/static/img/woman.webp',
                        },
                        {
                            id: 16,
                            poster: '/static/img/woman.webp',
                        },
                        {
                            id: 17,
                            poster: '/static/img/woman.webp',
                        },
                        {
                            id: 18,
                            poster: '/static/img/woman.webp',
                        },
                        {
                            id: 19,
                            poster: '/static/img/woman.webp',
                        },
                        {
                            id: 100,
                            poster: '/static/img/woman.webp',
                        },
                    ],
                },
                {
                    title: 'Комедии',
                    content: [
                        {
                            id: 111,
                            poster: '/static/img/cat.webp',
                        },
                        {
                            id: 122,
                            poster: '/static/img/cat.webp',
                        },
                        {
                            id: 133,
                            poster: '/static/img/cat.webp',
                        },
                        {
                            id: 144,
                            poster: '/static/img/cat.webp',
                        },
                        {
                            id: 155,
                            poster: '/static/img/cat.webp',
                        },
                        {
                            id: 166,
                            poster: '/static/img/cat.webp',
                        },
                        {
                            id: 177,
                            poster: '/static/img/cat.webp',
                        },
                    ],
                },
            ],
        };

        this.view.insertIntoContext(contentData);

        this.view.show();

        this.onSwitchOn(data);
    }

    onSwitchOn(data: any = {}) {
        if (data.modalStatus) {
            ModalService.show(data.modalStatus);
        }
    }

    switchOff() {
        super.switchOff();
        eventBus.off(Events.OpenSubMenuGenres, this.onOpenSubMenuGenres);
        this.view.hide();
    }

    showGenrePage = (index: number) => { // eslint-disable-line
        // TODO: Сделать открытие контента по жанру (в соотетствующем тикете)
    }

    onOpenSubMenuGenres = () => {
        const genresSubMenu = document.querySelector('.genres .hidden');
        if (genresSubMenu !== null) {
            genresSubMenu.classList.remove('hidden');
        } else {
            document.querySelector('.genres__sub-menu').classList.add('hidden');
        }
    }
}

export default MoviesController;
