import Controller from './Controller';
import MainView from '../views/MainVIew/MainView';
import ModalService from '../services/ModalService';
import MovieModel from '../models/MovieModel';
import {Error} from '../consts/errors';
import selectRandomMovie from '../tools/selectRandom';
import TVShowsModel from '../models/TVShowsModel';

interface ContextData {
    preview: { [key: string]: string },
    blocks: { [key: string]: string }[],
}

/**
 * @class
 * Контроллер для главной страницы
 */
class MainController extends Controller {
    view: MainView;

    constructor() {
        super(new MainView());
    }

    switchOn(data: any = {}) {
        const fakeContentData = { // фейковый контент, пока не реализовали
            preview: {
                id: 1,

                poster: '/static/img/movie.png',
                name: 'Фильм',
            },
            blocks: [
                {
                    title: 'Топ',
                    content: [
                        {
                            id: 1,
                            poster: '/static/img/witcher.webp',
                            isAdded: true,
                        },
                        {
                            id: 2,
                            poster: '/static/img/witcher.webp',
                            isAdded: true,
                            isLike: false,
                        },
                        {
                            id: 3,
                            poster: '/static/img/witcher.webp',
                            isAdded: false,
                            isLike: true,
                        },
                        {
                            id: 58746,
                            poster: '/static/img/witcher.webp',
                            isAdded: false,
                            isLike: true,
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
                    title: 'Последнее',
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
                    title: 'Фильмы',
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
                    title: 'Сериалы',
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

        Promise.all([
            MovieModel.getTopMovies(15),
            MovieModel.getLatestMovies(15),
            TVShowsModel.getTopTVShows(15),
            TVShowsModel.getLatestTVShows(15),
        ]).then(([topResponseMovies, latestResponseMovies, topResponseTVShows, latestResponseTVShows]) => {
            if (topResponseMovies.error || latestResponseMovies.error ||
                topResponseTVShows.error || latestResponseTVShows.error) {
                this.view.insertIntoContext(fakeContentData);
                this.view.show();
                this.onSwitchOn(data);
                return;
            }

            const randomMovie = selectRandomMovie([
                topResponseMovies.body.movies || [],
                latestResponseMovies.body.movies || [],
                topResponseTVShows.body.tvshows || [],
                latestResponseTVShows.body.tvshows || [],
            ],
            );

            const contentData: ContextData = {
                preview: randomMovie,
                blocks: [
                    {
                        title: 'Топ фильмов',
                        content: topResponseMovies.body.movies || [],
                    },
                    {
                        title: 'Последние фильмы',
                        content: latestResponseMovies.body.movies || [],
                    },
                    {
                        title: 'Топ сериалов',
                        content: topResponseTVShows.body.tvshows || [],
                    },
                    {
                        title: 'Последние сериалы',
                        content: latestResponseTVShows.body.tvshows || [],
                    },
                ],
            };

            this.view.insertIntoContext(contentData);
            this.view.show();
            this.onSwitchOn(data);
            super.switchOn(data);
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
}

export default MainController;
