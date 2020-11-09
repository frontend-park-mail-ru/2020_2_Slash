import eventBus from './EventBus';
import Events from '../consts/events';
import InfoBlock from '../components/InfoBlock/InfoBlock';
import ResponseType from '../tools/ResponseType';
import ContentPopup from '../components/ContentPopup/ContentPopup';
import MovieModel from '../models/MovieModel';
import {Error} from '../consts/errors';
import Context from '../tools/Context';

interface ContextData {
    contentId: number,
    contentData: { [key: string]: string },
    content?: { [key: string]: string }[],
}

/**
 * @class
 * Класс, отвечающий за создание и наполнение содержимым инфоблока о фильме/сериале
 */
class ContentService {
    private static instance: ContentService;

    /**
     * Создает экземпляр ContentService
     *
     * @constructor
     * @this  {ContentService}
     */
    private constructor() {
        eventBus.on(Events.OpenInfoBlock, this.onOpenInfoBlock.bind(this))
            .on(Events.AddToFavourites, this.onAddToFavourites.bind(this))
            .on(Events.ContentIsLiked, this.onContentIsLiked.bind(this))
            .on(Events.ContentIsDisliked, this.onContentIsDisliked.bind(this))
            .on(Events.ContentInfoRequested, this.onContentInfoRequested.bind(this))
            .on(Events.ContentByExternalReference, this.onContentByExternalReference.bind(this));
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

    /**
     * @function
     * Колбэк на запрос инфо о фильме/сериале
     * Наполняет данными и отрисовывает инфоблок
     * @param {Object} data - Данные для этого коллбэка
     */

    async onOpenInfoBlock(data: any) {
        const infoBlock = new InfoBlock({targetButton: window.event.target});

        const promise = MovieModel.getMovie({id: data.id}).then((response: ResponseType) => {
            if (!response.error) {
                const contentData: Context = response.body.movie;

                const infoBlockData: ContextData = {
                    contentId: data.id,
                    contentData: contentData,
                };
                infoBlock.addToContext(infoBlockData);
            }
            return infoBlock;
        });

        const resultInfoBlock = await promise;
        resultInfoBlock.render();
    }

    onContentInfoRequested(data: any) {
        MovieModel.getMovie({id: data.id}).then((response: ResponseType) => {
            if (!response.error) {
                const contentData: any = response.body.movie;
                let content: Context[];

                const infoBlockData: ContextData = {
                    contentId: data.id,
                    contentData: contentData,
                };

                MovieModel.getMoviesByGenre(contentData.genres[0].id, 8).then((response: ResponseType) => {
                    if (response.error) {
                        return;
                    }

                    const {movies} = response.body;
                    const content = movies.filter((movie: any) => movie.id !== contentData.id);
                    if (content.length > 0) {
                        infoBlockData.content = content;
                    } else {
                        infoBlockData.content = null;
                    }
                    const path = document.location.href;
                    window.history.pushState(null, null, path);
                    window.history.replaceState(history.state, null, path.includes('?') ?
                        path + `&cid=${data.id}` :
                        path + `?cid=${data.id}`);

                    const oldContentPopup = document.querySelector('.content-popup');
                    if (oldContentPopup) {
                        oldContentPopup.remove();
                    }

                    const contentPopup = new ContentPopup(infoBlockData, document.querySelector('.application'));

                    contentPopup.render();
                }).catch((error: Error) => console.log(error));
            }
        }).catch((error: Error) => console.log(error));
    }

    onContentByExternalReference(data: any) {
        MovieModel.getMovie({id: data.id}).then((response: ResponseType) => {
            if (!response.error) {
                const contentData: any = response.body.movie;
                let content: Context[];

                const infoBlockData: ContextData = {
                    contentId: data.id,
                    contentData: contentData,
                };

                MovieModel.getMoviesByGenre(contentData.genres[0].id, 8).then((response: ResponseType) => {
                    if (response.error) {
                        return;
                    }

                    const {movies} = response.body;
                    const content = movies.filter((movie: any) => movie.id !== contentData.id);
                    if (content.length > 0) {
                        infoBlockData.content = content;
                    } else {
                        infoBlockData.content = null;
                    }

                    const path = document.location.href;
                    window.history.pushState(null, null, path);
                    window.history.replaceState(history.state, null, `/content/${data.id}`);

                    const contentPopup = new ContentPopup(infoBlockData, document.querySelector('.application'));

                    contentPopup.render();
                }).catch((error: Error) => console.log(error));
            }
        }).catch((error: Error) => console.log(error));
    }

    changeIcon(currentButton: any, anotherButton: any, icon: string, status: string) {
        currentButton.setAttribute('src', icon);
        currentButton.parentElement.dataset.status = status;
        if (anotherButton) anotherButton.dataset.status = status;
    }

    onAddToFavourites(data: { event: string, id: string, status: boolean }) {
        const btn = window.event.srcElement;
        if (window.event.srcElement.parentElement.dataset.status == 'true') {
            MovieModel.removeFromFavourites(parseInt(data.id, 10)).then((response: ResponseType) => {
                if (!response.error) {
                    this.changeIcon(btn, null, '/static/img/add.svg', 'false');
                    this.fixAllAddButtons(data.id, '/static/img/add.svg', 'false');
                }
            }).catch((error: Error) => console.log(error));
        } else {
            MovieModel.addToFavourites(parseInt(data.id, 10)).then((response: ResponseType) => {
                if (!response.error) {
                    this.changeIcon(btn, null, '/static/img/is-added.svg', 'true');
                    this.fixAllAddButtons(data.id, '/static/img/is-added.svg', 'true');
                }
            }).catch((error: Error) => console.log(error));
        }
    }

    onContentIsLiked(data: { id: number, status: string }) {
        const btn = window.event.srcElement;

        if (data.status === '') {
            MovieModel.addVote(data.id, true).then((response: ResponseType) => {
                if (!response.error) {
                    this.changeIcon(btn, btn.parentElement.nextElementSibling,
                        '/static/img/is-liked.svg', 'true');
                    this.fixAllLikeButtons(data.id.toString(), '/static/img/is-liked.svg', 'true');
                    this.fixAllDislikeButtons(data.id.toString(), '/static/img/dislike.svg', 'true');
                }
            }).catch((error: Error) => console.log(error));
        } else if (data.status === 'true') {
            MovieModel.removeVote(data.id).then((response: ResponseType) => {
                if (!response.error) {
                    this.changeIcon(btn, btn.parentElement.nextElementSibling, '/static/img/like.svg', '');
                    this.fixAllLikeButtons(data.id.toString(), '/static/img/like.svg', '');
                    this.fixAllDislikeButtons(data.id.toString(), '/static/img/dislike.svg', '');
                }
            }).catch((error: Error) => console.log(error));
        } else if (data.status === 'false') {
            MovieModel.changeVote(data.id, true).then((response: ResponseType) => {
                if (!response.error) {
                    this.changeIcon(btn, btn.parentElement.nextElementSibling,
                        '/static/img/is-liked.svg', 'true');
                    this.fixAllLikeButtons(data.id.toString(), '/static/img/is-liked.svg', 'true');
                    this.fixAllDislikeButtons(data.id.toString(), '/static/img/dislike.svg', 'true');
                }
            }).catch((error: Error) => console.log(error));
        }
    }

    onContentIsDisliked(data: { id: number, status: string }) {
        const btn = window.event.srcElement;
        if (data.status === '') {
            MovieModel.addVote(data.id, false).then((response: ResponseType) => {
                if (!response.error) {
                    this.changeIcon(btn, btn.parentElement.previousElementSibling,
                        '/static/img/is-disliked.svg', 'false');
                    this.fixAllDislikeButtons(data.id.toString(), '/static/img/is-disliked.svg', 'false');
                    this.fixAllLikeButtons(data.id.toString(), '/static/img/like.svg', 'false');
                }
            }).catch((error: Error) => console.log(error));
        } else if (data.status == 'true') {
            MovieModel.changeVote(data.id, false).then((response: ResponseType) => {
                if (!response.error) {
                    this.changeIcon(btn, btn.parentElement.previousElementSibling,
                        '/static/img/is-disliked.svg', 'false');
                    this.fixAllDislikeButtons(data.id.toString(), '/static/img/is-disliked.svg', 'false');
                    this.fixAllLikeButtons(data.id.toString(), '/static/img/like.svg', 'false');
                }
            }).catch((error: Error) => console.log(error));
        } else if (data.status === 'false') {
            MovieModel.removeVote(data.id).then((response: ResponseType) => {
                if (!response.error) {
                    this.changeIcon(btn, btn.parentElement.previousElementSibling,
                        '/static/img/dislike.svg', '');
                    this.fixAllDislikeButtons(data.id.toString(), '/static/img/dislike.svg', '');
                    this.fixAllLikeButtons(data.id.toString(), '/static/img/like.svg', '');
                }
            }).catch((error: Error) => console.log(error));
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
}

export default ContentService;
