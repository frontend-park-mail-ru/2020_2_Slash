import Component from '../Component';
import Context from '../../tools/Context';
import template from './ContentPopup.hbs';
import Grid from '../Grid/Grid';
import {SERVER_HOST} from '../../consts/settings';
import EventBus from '../../services/EventBus';
import Events from '../../consts/events';
import Modals from '../../consts/modals';
import Routes from '../../consts/routes';
import Types from '../../consts/contentType';
import ContentService from '../../services/ContentService';

/**
 * @class
 * Компонента попапа
 */
class ContentPopup extends Component {
    private _onClick: any;
    private _onKeydownEscape: any;
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

        if (EventBus.getListeners().seasonChanged) {
            EventBus.getListeners().seasonChanged = [];
        }

        this._onClick = function(event: any) {
            const closingTarget = event.target.classList.contains('blocker') ||
                event.target.closest('.close-btn') || event.target.classList.contains('modal__subscribe') ||
                event.target.classList.contains('genre-item__value');
            if (closingTarget) {
                this.remove();
            }
            const subscribeTarget = event.target.classList.contains('modal__subscribe');
            if (subscribeTarget) {
                const authStatus = localStorage.getItem('authorized');
                if (authStatus == 'false') {
                    EventBus.emit(Events.RevealPopup, {modalstatus: Modals.signin});
                } else {
                    EventBus.emit(Events.PathChanged, {path: Routes.ProfilePage, info: 'SubscribeTab'});
                }
            }
        }.bind(this);

        this._onKeydownEscape = function(event: any) {
            if (event.key === 'Escape') {
                this.remove();
            }
        }.bind(this);

        this.parent.addEventListener('click', this._onClick);
        window.addEventListener('keydown', this._onKeydownEscape);
        EventBus.on(Events.SeasonChanged, this.onSeasonChanged);
    }

    /**
     * Коллбэк на удаление элемента Popup со страницы
     */
    onDestroy() {
        EventBus.off(Events.PathChanged, this.remove);

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

        this.parent.removeEventListener('click', this._onClick);
        window.removeEventListener('keydown', this._onKeydownEscape);
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
        const buttons = document.querySelectorAll('.seasons-wrapper__button');
        buttons.forEach((btn) => btn.setAttribute('style',
            'background-color: var(--highly-transparent-white);'));

        const currentSeason = document.querySelector(`[data-currentSeason="${data.currentseason}"]`);
        if (currentSeason) {
            currentSeason.setAttribute('style', 'background-color: var(--orangered-tr);');
        }
        this.context.serialsSeasons[data.currentseason - 1].column = 3;
        this.context.serialsSeasons[data.currentseason - 1].gap = '2vw';
        this.context.serialsSeasons[data.currentseason - 1].is_free = this.context.is_free;
        this.context.Grid = new Grid(this.context.serialsSeasons[data.currentseason - 1]).render();
        const grid = document.querySelector('.modal__season-grid');
        grid.innerHTML = this.context.Grid;
    }


    /**
     * Удаляет попап в document
     */
    remove = () => {
        const popup = document.querySelector('.content-popup');
        if (popup) {
            this.parent.querySelector('.main').removeChild(popup);
        }


        this.onDestroy();
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
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
            this.context.tvshow.seasons[0].is_free = this.context.contentData.is_free;
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
        this.parent.querySelector('.main').appendChild(popupDiv);

        this.context.subscription = localStorage.getItem('subscription');

        if (this.context.type === Types.TVShow) {
            this.onSeasonChanged({currentseason: 1});

            const grid = document.querySelector('.modal__season-grid .content__grid');
            if (grid) {
                grid.classList.add('episodes__grid');

                ContentService.getInstance().fixGrid();
            }
        }
    }
}

export default ContentPopup;
