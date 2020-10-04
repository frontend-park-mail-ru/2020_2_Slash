import BaseController from './BaseController.js';
import MainView from '../views/MainVIew/MainView.js';
import ModalService from '../services/ModalService.js';

class MainController extends BaseController {
    constructor() {
        super(new MainView());
    }

    switchOn(data = {}) {
        const sessionData = { // запрос на валидность сессии
            authorized: false,
            avatar: '/static/img/avatar.svg',
        };

        const contentData = { // запрос за контентом для слайдеров и превью панелью
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
                            poster: '/static/img/witcher.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/witcher.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/witcher.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/witcher.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/witcher.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/witcher.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/witcher.png'
                        },
                    ],
                },
                {
                    title: 'Последнее',
                    content: [
                        {
                            id: 1,
                            poster: '/static/img/fword.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/fword.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/fword.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/fword.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/fword.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/fword.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/fword.png'
                        },
                    ],
                },
                {
                    title: 'Фильмы',
                    content: [
                        {
                            id: 1,
                            poster: '/static/img/woman.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/woman.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/woman.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/woman.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/woman.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/woman.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/woman.png'
                        },
                    ],
                },
                {
                    title: 'Сериалы',
                    content: [
                        {
                            id: 1,
                            poster: '/static/img/cat.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/cat.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/cat.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/cat.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/cat.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/cat.png'
                        },
                        {
                            id: 1,
                            poster: '/static/img/cat.png'
                        },
                    ],
                },
            ],
        };

        this.view.insertIntoContext(sessionData, contentData);

        this.view.show();

        this.onSwitchOn(data);
    }

    onSwitchOn(data = {}) {
        if (data.modalStatus) {
            ModalService.show(data.modalStatus);
        }
    }

    switchOff() {
        this.view.hide();
    }

}

export default MainController;
