import Controller from './Controller';
import MainView from '../views/MainVIew/MainView';
import ModalService from '../services/ModalService';

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
        const contentData = { // фейковый контент, пока не реализовали
            preview: {
                poster: '/static/img/movie.png',
                title: 'Психопаспорт',
            },
            blocks: [
                {
                    title: 'Топ',
                    content: [
                        {
                            id: 1,
                            poster: '/static/img/witcher.png',
                            isAdded: true,
                            statusLike: {
                                like: true,
                                dislike: false,
                            }
                        },
                        {
                            id: 2,
                            poster: '/static/img/witcher.png',
                            isAdded: true,
                            statusLike: {
                                like: false,
                                dislike: true,
                            }
                        },
                        {
                            id: 3,
                            poster: '/static/img/witcher.png',
                            isAdded: false,
                            statusLike: {
                                like: false,
                                dislike: true,
                            }
                        },
                        {
                            id: 58746,
                            poster: '/static/img/witcher.png',
                            isAdded: false,
                            statusLike: {
                                like: true,
                                dislike: false,
                            }
                        },
                        {
                            id: 4,
                            poster: '/static/img/witcher.png',
                        },
                        {
                            id: 5,
                            poster: '/static/img/witcher.png',
                        },
                        {
                            id: 6,
                            poster: '/static/img/witcher.png',
                        },
                    ],
                },
                {
                    title: 'Последнее',
                    content: [
                        {
                            id: 7,
                            poster: '/static/img/fword.png',
                        },
                        {
                            id: 8,
                            poster: '/static/img/fword.png',
                        },
                        {
                            id: 9,
                            poster: '/static/img/fword.png',
                        },
                        {
                            id: 10,
                            poster: '/static/img/fword.png',
                        },
                        {
                            id: 11,
                            poster: '/static/img/fword.png',
                        },
                        {
                            id: 12,
                            poster: '/static/img/fword.png',
                        },
                        {
                            id: 13,
                            poster: '/static/img/fword.png',
                        },
                    ],
                },
                {
                    title: 'Фильмы',
                    content: [
                        {
                            id: 14,
                            poster: '/static/img/woman.png',
                        },
                        {
                            id: 15,
                            poster: '/static/img/woman.png',
                        },
                        {
                            id: 16,
                            poster: '/static/img/woman.png',
                        },
                        {
                            id: 17,
                            poster: '/static/img/woman.png',
                        },
                        {
                            id: 18,
                            poster: '/static/img/woman.png',
                        },
                        {
                            id: 19,
                            poster: '/static/img/woman.png',
                        },
                        {
                            id: 100,
                            poster: '/static/img/woman.png',
                        },
                    ],
                },
                {
                    title: 'Сериалы',
                    content: [
                        {
                            id: 111,
                            poster: '/static/img/cat.png',
                        },
                        {
                            id: 122,
                            poster: '/static/img/cat.png',
                        },
                        {
                            id: 133,
                            poster: '/static/img/cat.png',
                        },
                        {
                            id: 144,
                            poster: '/static/img/cat.png',
                        },
                        {
                            id: 155,
                            poster: '/static/img/cat.png',
                        },
                        {
                            id: 166,
                            poster: '/static/img/cat.png',
                        },
                        {
                            id: 177,
                            poster: '/static/img/cat.png',
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
        this.view.hide();
    }
}

export default MainController;
