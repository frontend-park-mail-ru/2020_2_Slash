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
                    poster: '/static/img/witcher.png',
                },
                {
                    id: 2,
                    poster: '/static/img/witcher.png',
                },
                {
                    id: 3,
                    poster: '/static/img/witcher.png',
                },
                {
                    id: 58746,
                    poster: '/static/img/witcher.png',
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
