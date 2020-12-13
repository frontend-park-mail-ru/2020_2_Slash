import Component from '../Component';
import Context from '../../tools/Context';
import template from './ContentPopup.hbs';
import Grid from '../Grid/Grid';
import {SERVER_HOST} from '../../consts/settings';
import EventBus from '../../services/EventBus';
import Events from '../../consts/events';

/**
 * @class
 * Компонента попапа
 */
class ContentPopup extends Component {
    /**
     * Создает экземпляр ContentPopup
     *
     * @constructor
     * @this  {ContentPopup}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        window.addEventListener('keydown', this.onKeydownEscape);
        window.addEventListener('popstate', this.onPopstate);
        this.parent.addEventListener('click', this.onClick);

        if (EventBus.getListeners().seasonChanged) {
            EventBus.getListeners().seasonChanged = [];
        }

        EventBus.on(Events.SeasonChanged, this.onSeasonChanged);
    }

    onClick = (event: any) => {
        const closingTarget = event.target.classList.contains('blocker') ||
            event.target.closest('.close-btn');
        if (closingTarget) {
            this.remove();
        }
    }

    onPopstate = () => {
        this.parent.removeEventListener('click', this.onClick);
        EventBus.off(Events.SeasonChanged, this.onSeasonChanged);
        window.removeEventListener('keydown', this.onKeydownEscape);
        window.removeEventListener('popstate', this.onPopstate);
    }

    onKeydownEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            this.remove();
        }
    }

    /**
     * Удаляет попап в document
     */
    remove = () => {
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
        EventBus.off(Events.PathChanged, this.remove);

        this.parent.removeEventListener('click', this.onClick);

        let pathWithoutCid = '';

        const sidIndex = window.location.search.indexOf('sid');
        if (sidIndex > 0) {
            pathWithoutCid = window.location.search.slice(0, sidIndex - 1);
        }

        const midIndex = window.location.search.indexOf('mid');
        if (midIndex > 0) {
            pathWithoutCid = window.location.search.slice(0, midIndex - 1);
        }

        window.history.replaceState(history.state, null, window.location.pathname + pathWithoutCid);
    }

    addLikeIcons() {
        const likeIcon =
            '<img class="item-like-btn__img item__btn-img" src="/static/img/like.svg" loading="lazy">';
        const disLikeIcon =
            '<img class="item-dislike-btn__img item__btn-img" src="/static/img/dislike.svg" loading="lazy">';
        const isLikedIcon =
            '<img class="item-like-btn__img item__btn-img" src="/static/img/is-liked.svg" loading="lazy">';
        const isDislikedIcon =
            '<img class="slider-dislike-btn__img item__btn-img" src="/static/img/is-disliked.svg" loading="lazy">';

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

    onSeasonChanged = (data: any) => {
        this.context.serialsSeasons[data.currentseason - 1].column = 3;
        this.context.serialsSeasons[data.currentseason - 1].gap = '2vw';
        this.context.Grid = new Grid(this.context.serialsSeasons[data.currentseason - 1]).render();
        const grid = document.querySelector('.modal__season-grid');
        grid.innerHTML = this.context.Grid;
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

        this.context.column = 3;
        this.context.gap = '2vw';
        const grid = new Grid(this.context);

        let seasonsGrid: string;
        let serialsSeasons = '';
        this.context.href = `/watch/${this.context.contentData.id}`;
        if (this.context.tvshow) {
            this.context.tvshow.seasons[0].column = 3;
            this.context.tvshow.seasons[0].gap = '2vw';
            seasonsGrid = new Grid(this.context.tvshow.seasons[0]).render();
            serialsSeasons = this.context.tvshow.seasons;
            this.context.href = `/watch/${this.context.tvshow.id}?season=1&episode=1`;
        }


        this.context.contentData.genres.forEach((genre: any) => {
            genre.type = this.context.contentData.type + 's';
        });

        this.context = {
            ...this.context.contentData,
            id: this.context.contentId,
            content: this.context.content,
            moreLikeThis: grid.render(),
            episodes: seasonsGrid,
            serialsSeasons: serialsSeasons,
            href: this.context.href,
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
    }
}

export default ContentPopup;
