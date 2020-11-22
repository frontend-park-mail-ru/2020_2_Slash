import Component from '../Component';
import Context from '../../tools/Context';
import template from './ContentPopup.hbs';
import Grid from '../Grid/Grid';
import {SERVER_HOST} from '../../consts/settings';

/**
 * @class
 * Компонента попапа
 */
class ContentPopup extends Component {
    private readonly _onClick: any;
    private readonly _onPopstate: any;
    private readonly _onClickEscape: any;

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
            const closingTarget = event.target.classList.contains('blocker') ||
                event.target.closest('.close-btn');
            if (closingTarget) {
                this.remove();
            }
        }.bind(this);

        this._onPopstate = function() {
            this.remove();
        }.bind(this);

        this._onClickEscape = function(event: any) {
            if(event.key === "Escape") {
                this.remove();
            }
        }.bind(this);

        window.addEventListener('keydown', this._onClickEscape);
        window.addEventListener('popstate', this._onPopstate);
        this.parent.addEventListener('click', this._onClick);
    }

    /**
     * Удаляет попап в document
     */
    remove() {
        const page = document.querySelector('.scroll-fixed');
        if (page) {
            this.parent.innerHTML = page.innerHTML;
        }

        this.onDestroy();
    }

    /**
     * Коллбэк на удаление элемента Popup со страницы
     */
    onDestroy() {
        window.removeEventListener('popstate', this._onPopstate);
        this.parent.removeEventListener('click', this._onClick);

        const path = document.location.href;
        window.history.pushState(null, null, path);

        const reg = new RegExp('^/content/\\d+?$'); //eslint-disable-line
        const result = window.location.pathname.match(reg);
        if (result) {
            window.history.replaceState(history.state, null, '/browse');
        } else {
            window.history.replaceState(history.state, null, window.location.pathname);
        }
    }

    addLikeIcons() {
        const likeIcon = '<img class="item-like-btn__img item__btn-img" src="/static/img/like.svg">';
        const disLikeIcon = '<img class="item-dislike-btn__img item__btn-img" src="/static/img/dislike.svg">';
        const isLikedIcon =' <img class="item-like-btn__img item__btn-img" src="/static/img/is-liked.svg">';
        const isDislikedIcon = '<img class="slider-dislike-btn__img item__btn-img" src="/static/img/is-disliked.svg">';

        if (this.context.is_liked === true) {
            this.context.like = isLikedIcon;
            this.context.dislike = disLikeIcon;
        } else if (this.context.is_liked === false) {
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
        this.context = {
            ...this.context.contentData,
            id: this.context.contentId,
            content: this.context.content,
            moreLikeThis: grid.render(),
        };

        if (this.context.actors && this.context.actors.length > 3) {
            this.context.slicedCast = this.context.actors.slice(0, 3);
        } else {
            this.context.slicedCast = this.context.actors;
        }

        this.addLikeIcons();

        this.context.host = SERVER_HOST;

        popupDiv.innerHTML = this.template(this.context);
        this.parent.appendChild(popupDiv);

        const gridElement = document.querySelector('.content-popup-wrapper .content__grid');
        if (gridElement) {
            gridElement.classList.remove('content__grid');
            gridElement.classList.add('modal__grid');
        }
    }
}

export default ContentPopup;
