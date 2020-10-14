import BaseController from './BaseController.js';
import MainView from '../views/MainVIew/MainView.js';
import ModalService from '../services/ModalService.js';
import UserModel from '../models/UserModel.js';
import {SERVER_HOST} from '../consts/settings.ts';

/**
 * @class
 * Контроллер для главной страницы
 */
class MainController extends BaseController {
    constructor() {
        super(new MainView());
    }

    switchOn(data = {}) {
        const contentData = { // фейковый контент, пока не реализовали
            preview: {
                poster: 'img/movie.png',
                title: 'Психопаспорт',
            },
            blocks: [
                {
                    title: 'Топ',
                    content: [
                        {
                            id: 1,
                            poster: 'img/witcher.png',
                        },
                        {
                            id: 2,
                            poster: 'img/witcher.png',
                        },
                        {
                            id: 3,
                            poster: 'img/witcher.png',
                        },
                        {
                            id: 58746,
                            poster: 'img/witcher.png',
                        },
                        {
                            id: 4,
                            poster: 'img/witcher.png',
                        },
                        {
                            id: 5,
                            poster: 'img/witcher.png',
                        },
                        {
                            id: 6,
                            poster: 'img/witcher.png',
                        },
                    ],
                },
                {
                    title: 'Последнее',
                    content: [
                        {
                            id: 7,
                            poster: 'img/fword.png',
                        },
                        {
                            id: 8,
                            poster: 'img/fword.png',
                        },
                        {
                            id: 9,
                            poster: 'img/fword.png',
                        },
                        {
                            id: 10,
                            poster: 'img/fword.png',
                        },
                        {
                            id: 11,
                            poster: 'img/fword.png',
                        },
                        {
                            id: 12,
                            poster: 'img/fword.png',
                        },
                        {
                            id: 13,
                            poster: 'img/fword.png',
                        },
                    ],
                },
                {
                    title: 'Фильмы',
                    content: [
                        {
                            id: 14,
                            poster: 'img/woman.png',
                        },
                        {
                            id: 15,
                            poster: 'img/woman.png',
                        },
                        {
                            id: 16,
                            poster: 'img/woman.png',
                        },
                        {
                            id: 17,
                            poster: 'img/woman.png',
                        },
                        {
                            id: 18,
                            poster: 'img/woman.png',
                        },
                        {
                            id: 19,
                            poster: 'img/woman.png',
                        },
                        {
                            id: 100,
                            poster: 'img/woman.png',
                        },
                    ],
                },
                {
                    title: 'Сериалы',
                    content: [
                        {
                            id: 111,
                            poster: 'img/cat.png',
                        },
                        {
                            id: 122,
                            poster: 'img/cat.png',
                        },
                        {
                            id: 133,
                            poster: 'img/cat.png',
                        },
                        {
                            id: 144,
                            poster: 'img/cat.png',
                        },
                        {
                            id: 155,
                            poster: 'img/cat.png',
                        },
                        {
                            id: 166,
                            poster: 'img/cat.png',
                        },
                        {
                            id: 177,
                            poster: 'img/cat.png',
                        },
                    ],
                },
            ],
        };

        UserModel.getProfile().then((response) => {
            const sessionData = {
                authorized: false,
            };

            if (!response.error) {
                const avatar = response.avatar ? `${SERVER_HOST}${response.avatar}` : 'img/default.svg';
                sessionData.authorized = true;
                sessionData.avatar = avatar;
            }

            this.view.insertIntoContext(sessionData, contentData);

            this.view.show();

            this.onSwitchOn(data);
        }).catch((error) => console.log(error));
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
