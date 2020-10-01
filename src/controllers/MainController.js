import BaseController from './BaseController.js';
import MainView from '../views/MainVIew/MainView.js';
import ModalService from '../services/ModalService.js';

class MainController extends BaseController {
    constructor() {
        super(new MainView());
    }

    switchOn(data = {}) {
        const sessionData = { // запрос на валидность сессии
            authorized: true,
            avatar: 'img/avatar.svg',
        };

        const contentData = { // запрос за контентом для слайдеров и превью панелью
            preview: {
                poster: 'img/movie.png',
                title: 'Психопаспорт',
            },
            blocks: [
                {
                    title: 'Топ',
                    content: [
                        {poster: 'img/witcher.png'},
                        {poster: 'img/witcher.png'},
                        {poster: 'img/witcher.png'},
                        {poster: 'img/witcher.png'},
                        {poster: 'img/witcher.png'},
                        {poster: 'img/witcher.png'},
                        {poster: 'img/witcher.png'},
                        {poster: 'img/witcher.png'},
                        {poster: 'img/witcher.png'},
                    ],
                },
                {
                    title: 'Последнее',
                    content: [
                        {poster: 'img/fword.png'},
                        {poster: 'img/fword.png'},
                        {poster: 'img/fword.png'},
                        {poster: 'img/fword.png'},
                        {poster: 'img/fword.png'},
                        {poster: 'img/fword.png'},
                    ],
                },
                {
                    title: 'Фильмы',
                    content: [
                        {poster: 'img/woman.png'},
                        {poster: 'img/woman.png'},
                        {poster: 'img/woman.png'},
                        {poster: 'img/woman.png'},
                        {poster: 'img/woman.png'},
                        {poster: 'img/woman.png'},
                    ],
                },
                {
                    title: 'Сериалы',
                    content: [
                        {poster: 'img/cat.png'},
                        {poster: 'img/cat.png'},
                        {poster: 'img/cat.png'},
                        {poster: 'img/cat.png'},
                        {poster: 'img/cat.png'},
                        {poster: 'img/cat.png'},
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
