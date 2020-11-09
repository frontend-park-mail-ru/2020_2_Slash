import Controller from './Controller';
import MyListView from '../views/MyListView/MyListView';

class MyListController extends Controller {
    view: MyListView;

    constructor() {
        super(new MyListView());
    }

    switchOn(data: any = {}) {
        const contentData = {
            title: 'Мой список',
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
        };

        this.view.insertIntoContext(contentData);

        this.view.show();
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }
}

export default MyListController;
