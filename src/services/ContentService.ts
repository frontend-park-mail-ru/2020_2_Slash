import EventBus from './EventBus';
import Events from '../consts/events';
import InfoBlock from '../components/InfoBlock/InfoBlock';
import ResponseType from '../tools/ResponseType';
import ContentPopup from '../components/ContentPopup/ContentPopup';
import MovieModel from '../models/MovieModel';
import {Error} from '../consts/errors';
import Context from '../tools/Context';
import Modals from '../consts/modals';
import TVShowsModel from '../models/TVShowsModel';
import Types from '../consts/contentType';
import ContentModel from '../models/ContentModel';
import {MOBILE_DEVICE_WIDTH, TABLET_DEVICE_WIDTH} from '../consts/other';
import compareByField from '../tools/comparator';

interface ContextData {
    contentId?: number,
    contentData: { [key: string]: string },
    content?: { [key: string]: string }[],
    tvshow?: Array<any>,
}

/**
 * @class
 * Класс, отвечающий за создание и наполнение содержимым инфоблока о фильме/сериале
 */
class ContentService {
    private static instance: ContentService;
    private infoBlock: InfoBlock;
    private _GridUpdate: EventListenerOrEventListenerObject;

    /**
     * Создает экземпляр ContentService
     *
     * @constructor
     * @this  {ContentService}
     */
    private constructor() {
        EventBus.on(Events.OpenInfoBlock, this.onOpenInfoBlock.bind(this))
            .on(Events.AddToFavourites, this.onAddToFavourites.bind(this))
            .on(Events.ContentIsLiked, this.onContentIsLiked.bind(this))
            .on(Events.ContentIsDisliked, this.onContentIsDisliked.bind(this))
            .on(Events.ContentInfoRequested, this.onContentInfoRequested.bind(this))
            .on(Events.ContentByExternalReference, this.onContentByExternalReference.bind(this))
            .on(Events.UpdateRating, this.onUpdateRating.bind(this));

        this._GridUpdate = this.fixGrid.bind(this);

        window.addEventListener('resize', this._GridUpdate);
    }

    /**
     * Возвращает экземпляр ContentService
     *
     * @function
     * @this  {ContentService}
     */
    public static getInstance(): ContentService {
        if (!ContentService.instance) {
            ContentService.instance = new ContentService();
        }

        return ContentService.instance;
    }

    fixGrid = () => {
        let grid = document.querySelector('.content__grid');

        if (grid) {
            grid.classList.add('hidden');
            const width = window.innerWidth;
            grid.classList.remove('hidden');

            if (width <= TABLET_DEVICE_WIDTH) {
                grid.setAttribute('style', 'grid-template-columns: repeat(3, 1fr); ' +
                    'grid-column-gap: 0.2vw;');
            }

            if (width < MOBILE_DEVICE_WIDTH) {
                grid.setAttribute('style', 'grid-template-columns: repeat(2, 1fr); ' +
                    'grid-column-gap: 0.2vw');
            }

            if (width >=TABLET_DEVICE_WIDTH) {
                grid.setAttribute('style', 'grid-template-columns: repeat(6, 1fr); ' +
                    'grid-column-gap: 3px');
            }

            grid = document.querySelector('.seasons-wrapper__grid .content__grid');
            if (grid) {
                if (width > TABLET_DEVICE_WIDTH) {
                    grid.setAttribute('style', 'grid-template-columns: repeat(5, 1fr); ' +
                        'grid-column-gap: 3px');
                }
            }
        }
    }

    /**
     * @function
     * Колбэк на запрос инфо о фильме/сериале
     * Наполняет данными и отрисовывает инфоблок
     * @param {Object} data - Данные для этого коллбэка
     */

    async onOpenInfoBlock(data: any) {
        if (!this.infoBlock) {
            this.infoBlock = new InfoBlock({});
        }
        this.infoBlock.addTargetButton(window.event.target);

        if (data.contenttype == Types.TVShow) {
            const promise = Promise.all([
                TVShowsModel.getTVShow(data.tvshowId),
                ContentModel.getRating({id: data.id}),
                TVShowsModel.getSeasons(data.tvshowId),
            ]).then(([tvshow, rating, seasons]) => {
                if (!tvshow.error || !rating.error || !seasons.error) {
                    const contentData: Context = tvshow.body.tvshow;

                    seasons.body.tvshow.seasons.sort(compareByField('number'));

                    contentData.rating = rating.body.match;

                    const infoBlockData: ContextData = {
                        contentData: contentData,
                        tvshow: seasons.body.tvshow,
                    };

                    this.infoBlock.addToContext(infoBlockData);
                    return this.infoBlock;
                }
            });

            const resultInfoBlock = await promise;
            resultInfoBlock.render();
        } else {
            const promise = Promise.all([
                MovieModel.getMovie({id: data.movieId}),
                ContentModel.getRating({id: data.id}),
            ]).then(([movies, rating]) => {
                if (!movies.error || !rating.error) {
                    const contentData: Context = movies.body.movie;

                    contentData.rating = rating.body.match;

                    const infoBlockData: ContextData = {
                        contentData: contentData,
                    };

                    this.infoBlock.addToContext(infoBlockData);
                    return this.infoBlock;
                }
            });
            const resultInfoBlock = await promise;
            resultInfoBlock.render();

            const seasonTab = document.querySelector('[data-tab="seasonsTab"]');
            if (seasonTab) seasonTab.classList.add('hidden');
        }
    }

    onContentInfoRequested(data: any) {
        if (data.contenttype == Types.TVShow) {
            Promise.all([
                TVShowsModel.getTVShow(data.tvshowId),
                ContentModel.getRating({id: data.id}),
                TVShowsModel.getSeasons(data.tvshowId),
            ]).then(([tvshows, rating, seasons]) => {
                if (!tvshows.error || !rating.error || !seasons.error) {
                    const contentData: any = tvshows.body.tvshow;

                    seasons.body.tvshow.seasons.sort(compareByField('number'));
                    const infoPopupData: ContextData = {
                        contentId: data.tvshowId,
                        contentData: contentData,
                        tvshow: seasons.body.tvshow,
                    };

                    infoPopupData.contentData.rating = rating.body.match;

                    const genre = contentData.genres ? contentData.genres[0].id : 1;

                    TVShowsModel.getTVShowsByGenre(genre, 10).then((response: ResponseType) => {
                        if (response.error) {
                            return;
                        }

                        const {tvshows} = response.body;
                        const content = tvshows.filter((tvshow: any) => tvshow.id !== contentData.id);
                        infoPopupData.content = content.length > 0 ? content : null;

                        const path = document.location.href;
                        window.history.replaceState(history.state, null, path.includes('?') ?
                            path + `&sid=${data.tvshowId}` :
                            path + `?sid=${data.tvshowId}`);

                        const oldContentPopup = document.querySelector('.content-popup');
                        if (oldContentPopup) {
                            oldContentPopup.remove();
                        }

                        const contentPopup = new ContentPopup(infoPopupData, document.querySelector('.application'));

                        contentPopup.render();
                    }).catch((error: Error) => console.log(error));
                }
            });
        } else {
            Promise.all([
                MovieModel.getMovie({id: data.movieId}),
                ContentModel.getRating({id: data.id}),
            ]).then(([movies, rating]) => {
                if (!movies.error || !rating.error) {
                    const contentData: any = movies.body.movie;

                    const infoPopupData: ContextData = {
                        contentId: data.id,
                        contentData: contentData,
                    };

                    infoPopupData.contentData.rating = rating.body.match;

                    const genre = contentData.genres ? contentData.genres[0].id : 1;

                    MovieModel.getMoviesByGenre(genre, 10).then((response: ResponseType) => {
                        if (response.error) {
                            return;
                        }

                        const {movies} = response.body;
                        const content = movies.filter((movie: any) => movie.id !== contentData.id);
                        infoPopupData.content = content.length > 0 ? content : null;

                        const path = document.location.href;
                        window.history.replaceState(history.state, null, path.includes('?') ?
                            path + `&mid=${data.movieId}` :
                            path + `?mid=${data.movieId}`);

                        const oldContentPopup = document.querySelector('.content-popup');
                        if (oldContentPopup) {
                            oldContentPopup.remove();
                        }

                        const contentPopup = new ContentPopup(infoPopupData, document.querySelector('.application'));

                        contentPopup.render();
                    }).catch((error: Error) => console.log(error));
                }
            });
        }
    }

    onContentByExternalReference(data: any) {
        if (data.type === Types.TVShow) {
            Promise.all([
                TVShowsModel.getTVShow(data.id),
                ContentModel.getRating({id: data.id}),
                TVShowsModel.getSeasons(data.id),
            ]).then(([tvshows, rating, seasons]) => {
                if (!tvshows.error || !rating.error || !seasons.error) {
                    const contentData: any = tvshows.body.tvshow;

                    seasons.body.tvshow.seasons.sort(compareByField('number'));
                    const infoPopupData: ContextData = {
                        contentId: data.id,
                        contentData: contentData,
                        tvshow: seasons.body.tvshow,
                    };

                    infoPopupData.contentData.rating = rating.body.match;

                    const genre = contentData.genres ? contentData.genres[0].id : 1;

                    TVShowsModel.getTVShowsByGenre(genre, 10).then((response: ResponseType) => {
                        if (response.error) {
                            return;
                        }

                        const {tvshows} = response.body;
                        const content = tvshows.filter((tvshow: any) => tvshow.id !== contentData.id);
                        infoPopupData.content = content.length > 0 ? content : null;

                        if (window.location.search.search('=') > 0 &&
                            !(window.location.search.search('sid') > 0)) {
                            window.history.replaceState(history.state, null, window.location.pathname +
                                window.location.search + `&sid=${data.id}`);
                        }

                        if (window.location.search.search('=') < 0) {
                            window.history.replaceState(history.state, null, window.location.pathname +
                                window.location.search + `?sid=${data.id}`);
                        }

                        if (window.location.search.indexOf(`?sid=${data.id}`) == 0) {
                            window.history.replaceState(history.state, null, window.location.pathname +
                                `?sid=${data.id}`);
                        }

                        const contentPopup = new ContentPopup(infoPopupData, document.querySelector('.application'));

                        contentPopup.render();
                    }).catch((error: Error) => console.log(error));
                }
            });
        } else {
            Promise.all([
                MovieModel.getMovie({id: data.id}),
                ContentModel.getRating({id: data.id}),
            ]).then(([movies, rating]) => {
                if (!movies.error || !rating.error) {
                    const contentData: any = movies.body.movie || {};

                    const infoPopupData: ContextData = {
                        contentId: data.id,
                        contentData: contentData,
                    };

                    infoPopupData.contentData.rating = rating.body.match;

                    const genre = contentData.genres ? contentData.genres[0].id : 1;

                    MovieModel.getMoviesByGenre(genre, 10).then((response: ResponseType) => {
                        if (response.error) {
                            return;
                        }

                        const {movies} = response.body;
                        const content = movies.filter((movie: any) => movie.id !== contentData.id);
                        infoPopupData.content = content.length > 0 ? content : null;

                        if (window.location.search.search('=') > 0 && !(window.location.search.search('mid') > 0)) {
                            window.history.replaceState(history.state, null, window.location.pathname +
                                window.location.search + `&mid=${data.id}`);
                        }

                        if (window.location.search.search('=') < 0) {
                            window.history.replaceState(history.state, null, window.location.pathname +
                                window.location.search + `?mid=${data.id}`);
                        }

                        if (window.location.search.indexOf(`?mid=${data.id}`) == 0) {
                            window.history.replaceState(history.state, null, window.location.pathname +
                                `?mid=${data.id}`);
                        }

                        const contentPopup = new ContentPopup(infoPopupData, document.querySelector('.application'));

                        contentPopup.render();
                    }).catch((error: Error) => console.log(error));
                }
            });
        }
    }

    changeIcon(currentButton: any, anotherButton: any, icon: string, status: string) {
        currentButton.setAttribute('src', icon);
        currentButton.parentElement.dataset.status = status;
        if (anotherButton) anotherButton.dataset.status = status;
    }

    onAddToFavourites(data: { event: string, id: string, status: boolean }) {
        if (localStorage.getItem('authorized') == 'true') {
            const btn = window.event.srcElement;
            if (window.event.srcElement.parentElement.dataset.status == 'true') {
                ContentModel.removeFromFavourites(parseInt(data.id, 10)).then((response: ResponseType) => {
                    if (!response.error) {
                        this.changeIcon(btn, null, '/static/img/add.svg', 'false');
                        this.fixAllAddButtons(data.id, '/static/img/add.svg', 'false');
                    }
                }).catch((error: Error) => console.log(error));
            } else {
                ContentModel.addToFavourites(parseInt(data.id, 10)).then((response: ResponseType) => {
                    if (!response.error) {
                        this.changeIcon(btn, null, '/static/img/is-added.svg', 'true');
                        this.fixAllAddButtons(data.id, '/static/img/is-added.svg', 'true');
                    }
                }).catch((error: Error) => console.log(error));
            }
        } else {
            EventBus.emit(Events.RevealPopup, {modalstatus: Modals.signin});
        }
    }

    onContentIsLiked(data: { id: number, status: string }) {
        if (localStorage.getItem('authorized') == 'true') {
            const btn = window.event.srcElement;

            if (data.status === '') {
                ContentModel.addVote(data.id, true).then((response: ResponseType) => {
                    if (!response.error) {
                        this.changeIcon(btn, btn.parentElement.nextElementSibling,
                            '/static/img/is-liked.svg', 'true');
                        this.fixAllLikeButtons(data.id.toString(), '/static/img/is-liked.svg', 'true');
                        this.fixAllDislikeButtons(data.id.toString(), '/static/img/dislike.svg', 'true');
                        EventBus.emit(Events.UpdateRating, data);
                    }
                }).catch((error: Error) => console.log(error));
            } else if (data.status === 'true') {
                ContentModel.removeVote(data.id).then((response: ResponseType) => {
                    if (!response.error) {
                        this.changeIcon(btn, btn.parentElement.nextElementSibling, '/static/img/like.svg', '');
                        this.fixAllLikeButtons(data.id.toString(), '/static/img/like.svg', '');
                        this.fixAllDislikeButtons(data.id.toString(), '/static/img/dislike.svg', '');
                        EventBus.emit(Events.UpdateRating, data);
                    }
                }).catch((error: Error) => console.log(error));
            } else if (data.status === 'false') {
                ContentModel.changeVote(data.id, true).then((response: ResponseType) => {
                    if (!response.error) {
                        this.changeIcon(btn, btn.parentElement.nextElementSibling,
                            '/static/img/is-liked.svg', 'true');
                        this.fixAllLikeButtons(data.id.toString(), '/static/img/is-liked.svg', 'true');
                        this.fixAllDislikeButtons(data.id.toString(), '/static/img/dislike.svg', 'true');
                        EventBus.emit(Events.UpdateRating, data);
                    }
                }).catch((error: Error) => console.log(error));
            }
        } else {
            EventBus.emit(Events.RevealPopup, {modalstatus: Modals.signin});
        }
    }

    onContentIsDisliked(data: { id: number, status: string }) {
        if (localStorage.getItem('authorized') == 'true') {
            const btn = window.event.srcElement;
            if (data.status === '') {
                ContentModel.addVote(data.id, false).then((response: ResponseType) => {
                    if (!response.error) {
                        this.changeIcon(btn, btn.parentElement.previousElementSibling,
                            '/static/img/is-disliked.svg', 'false');
                        this.fixAllDislikeButtons(data.id.toString(), '/static/img/is-disliked.svg', 'false');
                        this.fixAllLikeButtons(data.id.toString(), '/static/img/like.svg', 'false');
                        EventBus.emit(Events.UpdateRating, data);
                    }
                }).catch((error: Error) => console.log(error));
            } else if (data.status == 'true') {
                ContentModel.changeVote(data.id, false).then((response: ResponseType) => {
                    if (!response.error) {
                        this.changeIcon(btn, btn.parentElement.previousElementSibling,
                            '/static/img/is-disliked.svg', 'false');
                        this.fixAllDislikeButtons(data.id.toString(), '/static/img/is-disliked.svg', 'false');
                        this.fixAllLikeButtons(data.id.toString(), '/static/img/like.svg', 'false');
                        EventBus.emit(Events.UpdateRating, data);
                    }
                }).catch((error: Error) => console.log(error));
            } else if (data.status === 'false') {
                ContentModel.removeVote(data.id).then((response: ResponseType) => {
                    if (!response.error) {
                        this.changeIcon(btn, btn.parentElement.previousElementSibling,
                            '/static/img/dislike.svg', '');
                        this.fixAllDislikeButtons(data.id.toString(), '/static/img/dislike.svg', '');
                        this.fixAllLikeButtons(data.id.toString(), '/static/img/like.svg', '');
                        EventBus.emit(Events.UpdateRating, data);
                    }
                }).catch((error: Error) => console.log(error));
            }
        } else {
            EventBus.emit(Events.RevealPopup, {modalstatus: Modals.signin});
        }
    }

    fixAllAddButtons(id: string, icon: string, status: string) {
        const addButtons = document.querySelectorAll(`[data-event="AddToFavourites"][data-id="${id}"] img`);
        addButtons.forEach((button) => {
            this.changeIcon(button, null, icon, status);
        });
    }

    fixAllLikeButtons(id: string, icon: string, status: string) {
        const addButtons = document.querySelectorAll(`[data-event="contentIsLiked"][data-id="${id}"] img`);
        addButtons.forEach((button) => {
            this.changeIcon(button, null, icon, status);
        });
    }

    fixAllDislikeButtons(id: string, icon: string, status: string) {
        const addButtons = document.querySelectorAll(`[data-event="contentIsDisliked"][data-id="${id}"] img`);
        addButtons.forEach((button) => {
            this.changeIcon(button, null, icon, status);
        });
    }

    onUpdateRating(data: any) {
        ContentModel.getRating({id: data.id}).then((response: ResponseType) => {
            if (!response.error) {
                const rating = document.querySelector(`[data-misc="rating"][data-id="${data.id}"]`);
                if (rating) {
                    rating.textContent = `${response.body.match}% оценили положительно`;
                }
            }
        }).catch((error: Error) => console.log(error));
    }
}

export default ContentService;
