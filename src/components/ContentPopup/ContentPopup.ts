import Component from '../Component';
import Context from '../../tools/Context';
import template from './ContentPopup.hbs';
import EventBus from '../../services/EventBus';
import Events from '../../consts/events';
import Grid from '../Grid/Grid';

/**
 * @class
 * Компонента попапа
 */
class ContentPopup extends Component {
    private _onClick: any;
    private _onPlay: any;

    /**
     * Создает экземпляр Popup
     *
     * @constructor
     * @this  {Popup}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this._onClick = function(event: any) {
            const {target} = event;
            if (target.classList.contains('blocker') || target.closest('.close-btn')) {
                this.remove();
            }
        }.bind(this);

        this._onPlay = function(event: any) {
            this.remove();
        }.bind(this);

        this.parent.addEventListener('click', this._onClick);
        EventBus.on(Events.PathChanged, this._onPlay);
    }

    /**
     * Удаляет попап в document
     */
    remove() {
        const page = document.querySelector('.scroll-fixed');
        if (page) {
            this.parent.innerHTML = page.innerHTML;
        }
        const popup = document.querySelector('.content-popup');

        if (popup) {
            this.parent.removeChild(popup);
            this.onDestroy();
        }
    }

    /**
     * Коллбэк на удаление элемента Popup со страницы
     */
    onDestroy() {
        this.parent.removeEventListener('click', this._onClick);
    }

    addLikeIcons() {
        const likeIcon = '<img class="item-like-btn__img item__btn-img" src="/static/img/like.svg">';
        const disLikeIcon = '<img class="item-dislike-btn__img item__btn-img" src="/static/img/dislike.svg">';
        const isLikedIcon =' <img class="item-like-btn__img item__btn-img" src="/static/img/is-liked.svg">';
        const isDislikedIcon = '<img class="slider-dislike-btn__img item__btn-img" src="/static/img/is-disliked.svg">';

        if (this.context.isLike === true) {
            this.context.like = isLikedIcon;
            this.context.dislike = disLikeIcon;
        } else if (this.context.isLike === false) {
            this.context.like = likeIcon;
            this.context.dislike = isDislikedIcon;
        } else {
            this.context.like = likeIcon;
            this.context.dislike = disLikeIcon;
        }
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        const page = document.createElement('div');
        page.classList.add('scroll-fixed');
        page.innerHTML = this.parent.innerHTML;
        this.parent.innerHTML = '';
        this.parent.appendChild(page);

        const popupDiv = document.createElement('div');
        popupDiv.classList.add('content-popup');

        const grid = new Grid(this.context);
        this.context = {...this.context.contentData,
            id: this.context.contentId,
            content: this.context.content,
            moreLikeThis: grid.render(),
        };
        this.context.slicedCast = this.context.cast.slice(0, 3);

        this.addLikeIcons();

        popupDiv.innerHTML = this.template(this.context);
        this.parent.appendChild(popupDiv);

        const gridElement = document.querySelector('.content-popup-wrapper .content__grid');
        gridElement.classList.remove('content__grid');
        gridElement.classList.add('modal__grid');
    }
}

export default ContentPopup;
