import setTime from '../tools/time';
import eventBus from './EventBus';
import Events from '../consts/events';
import EpisodeModal from '../components/EpisodeModal/EpisodeModal';
import {SERVER_HOST} from '../consts/settings';
import tvShowQueue from '../tools/TVShowQueue';

class PlayerService {
    private video: any;
    private duration: any;
    private timeline: any;
    private timelineFront: any
    private timelineSlider: any
    private _onVideoPlay: any;
    private _onVideoPause: any;
    private _onVolumeOn: any;
    private _onMuteVolume: any;
    private _onFullScreenOn: any;
    private _onFullScreenOff: any;
    private _context: any;
    private watchPage: any;

    constructor(context?: any) {
        this._context = context;

        this._onVideoPlay = this.onVideoPlay.bind(this);
        this._onVideoPause = this.onVideoPause.bind(this);
        this._onMuteVolume = this.onMuteVolume.bind(this);
        this._onVolumeOn = this.onVolumeOn.bind(this);
        this._onFullScreenOn = this.onFullScreenOn.bind(this);
        this._onFullScreenOff = this.onFullScreenOff.bind(this);

        this.video = document.getElementsByClassName('video')[0];
        this.timeline = document.getElementsByClassName('player__timeline')[0];
        this.timelineSlider = document.getElementsByClassName('timeline__slider')[0];
        this.timelineFront = document.getElementsByClassName('timeline__front')[0];
    }

    start() {
        eventBus.on(Events.VideoPlay, this._onVideoPlay)
            .on(Events.VideoPause, this._onVideoPause)
            .on(Events.Mute, this._onMuteVolume)
            .on(Events.VolumeOn, this._onVolumeOn)
            .on(Events.FullscreenModeOn, this._onFullScreenOn)
            .on(Events.FullscreenModeOff, this._onFullScreenOff);

        this.video.addEventListener('timeupdate', this.onUpdateTime);
        window.addEventListener('keydown', this.onKeydownSpace);

        this.timeline.addEventListener('click', this.onTimelineUpdate);
        this.timeline.addEventListener('pointermove', this.onHoverTimeline);
        this.timeline.addEventListener('pointerout', this.onHoverOffTimeline);
        document.querySelector('.player__container').addEventListener('mouseover', this.showPlayerBar);
        document.querySelector('.watch__page').addEventListener('mouseover', this.showPlayerBar);
        document.querySelector('.watch__page').addEventListener('mouseout', this.hidePlayerBar);

        const soundBar = document.querySelector('.player-bar__volume-bar');
        soundBar.addEventListener('click', this.onVolumeUpdate);

        const volumeBar = document.querySelector('.player-bar__volume');
        volumeBar.addEventListener('pointermove', this.hideProgressBar);
        volumeBar.addEventListener('pointerout', this.showProgressBar);

        const nextContentButton = document.querySelector('.player-bar__next-content-btn');
        if (nextContentButton) {
            nextContentButton.addEventListener('pointermove', this.handleNextEpisodePointerMove);
            nextContentButton.addEventListener('pointerout', this.hoverOffContentModal);
            nextContentButton.addEventListener('click', this.handleNextEpisodeClick);
        }

        const prevContentButton = document.querySelector('.player-bar__prev-content-btn');
        if (prevContentButton) {
            prevContentButton.addEventListener('pointermove', this.handlePrevEpisodePointerMove);
            prevContentButton.addEventListener('pointerout', this.hoverOffContentModal);
            prevContentButton.addEventListener('click', this.handlePrevEpisodeClick);
        }

        document.addEventListener('DOMContentLoaded', this.onDOMContentLoaded);

        if (this._context) {
            const indexCurrentEpisode = {
                season: this._context.currentEpisode.indexSeason,
                episode: this._context.currentEpisode.indexEpisode,
            };

            if (tvShowQueue.isLastEpisode(indexCurrentEpisode.episode, indexCurrentEpisode.season,
                this._context.queue)) {
                const nextContentButton: any = document.querySelector('.player-bar__next-content-btn');
                nextContentButton.hidden = true;
            }

            if (tvShowQueue.isFirstEpisode(indexCurrentEpisode.episode, indexCurrentEpisode.season)) {
                const prevContentButton: any = document.querySelector('.player-bar__prev-content-btn');
                prevContentButton.hidden = true;
            }
        }

        this.watchPage = document.querySelector('.watch__page');

        document.querySelector('.player-bar__share-btn').addEventListener('click', this.share);
    }

    share = () => {
        if (navigator.share) {
            navigator.share({
                title: 'FlicksBox',
                text: window.location.href,
                url: window.location.href,
            }).then().catch();
        } else {
            const sharePopup = document.querySelector('.player-bar__share-popup');
            if (sharePopup) {
                sharePopup.classList.remove('hidden');

                const input = document.querySelector('.player-bar__share-input');
                input.value = window.location.href;

                window.addEventListener('click', (event: any) => {
                    if (!event.target.classList.contains('share-btn__img') &&
                        !event.target.classList.contains('player-bar__share-input') &&
                        !event.target.classList.contains('player-bar__share-popup')) {
                        sharePopup.classList.add('hidden');
                    }
                });
            }
        }
    }

    onKeydownSpace = (event: any) => {
        if (event.keyCode == 32) {
            if (this.video.paused) {
                this.onVideoPlay();
            } else {
                this.onVideoPause();
            }
        }
    }

    showPlayerBar = () => {
        const playerContainer = document.querySelector('.player__container');
        if (playerContainer) {
            playerContainer.setAttribute('style', 'opacity:1;');
        }
    }

    hidePlayerBar = () => {
        const playerContainer = document.querySelector('.player__container');
        if (playerContainer) {
            playerContainer.setAttribute('style', 'opacity:0;');
        }
    }

    onDOMContentLoaded() {
        const button = document.querySelector('.player-bar__play-btn');
        const buttonImg = document.querySelector('.player-play-btn__img');
        buttonImg.setAttribute('src', '/static/img/player-play.svg');
        button.removeAttribute('data-event');
        button.setAttribute('data-event', 'videoPlay');
    }

    onVideoPlay = () => {
        this.video.play();
        this.video.setAttribute('data-event', 'videoPause');
        this.changeButton('.player-bar__play-btn', '.player-play-btn__img',
            '/static/img/player-pause.svg', 'videoPause');
    }

    onVideoPause = () => {
        this.video.pause();
        this.video.setAttribute('data-event', 'videoPlay');
        this.changeButton('.player-bar__play-btn', '.player-play-btn__img',
            '/static/img/player-play.svg', 'videoPlay');
    }

    onTimelineUpdate = (event: any) => {
        const width = this.timeline.clientWidth;
        const currentPosition = event.clientX;

        const currentTime = currentPosition / width;

        this.timelineFront.style.width = `${(100 * currentTime)}%`;

        this.timelineSlider.style.left = (100 * currentTime).toString();

        const isPause = this.video.paused;
        this.video.pause();
        this.video.currentTime = this.video.duration * currentTime;
        if (!isPause) {
            this.video.play();
        }
    }

    onHoverTimeline = (event: any) => {
        const width = this.timeline.clientWidth;
        const currentPosition = event.clientX;
        const timelineMiddle: any = document.getElementsByClassName('timeline__middle')[0];

        timelineMiddle.style.width = `${100 * currentPosition / width}%`;
    }

    onHoverOffTimeline = () =>{
        const timelineMiddle: any = document.getElementsByClassName('timeline__middle')[0];

        timelineMiddle.style.width = '0%';
    }

    onVolumeUpdate = (event: any) => {
        this.video.volume = event.target.value;
        if (this.video.volume === 0) {
            this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
                '/static/img/player-mute.svg', 'volumeOn');
        } else {
            this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
                '/static/img/player-sound.svg', 'mute');
        }
    }

    setVolumeValue(value: number) {
        const volumeBar: any = document.getElementsByTagName('input')[0];

        volumeBar.value = value;
        this.video.volume = value;
    }

    onMuteVolume = () => {
        this.setVolumeValue(0);

        this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
            '/static/img/player-mute.svg', 'volumeOn');
    }

    onVolumeOn = () => {
        this.setVolumeValue(0.5);

        this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
            '/static/img/player-sound.svg', 'mute');
    }

    onUpdateTime = () => {
        const currentTime = this.video.currentTime;
        const duration = this.video.duration ? this.video.duration : 1;
        this.timelineFront.style.width = `${(100 * currentTime / duration)}%`;
        this.timelineSlider.style.left = `${(100 * currentTime / duration)}%`;
        const timelineSliderText: any = document.getElementsByClassName('timeline__time-text')[0];
        if (timelineSliderText !== undefined) {
            timelineSliderText.innerText = setTime(currentTime);
            timelineSliderText.style.left = `${(100 * currentTime / duration)}%`;
        }

        const timeLabel = document.querySelector('.player-bar__time');
        if (timeLabel !== null) {
            timeLabel.textContent = '';
            const text = document.createTextNode(setTime(currentTime) + ' / ' + setTime(duration));
            timeLabel.appendChild(text);
        }
    }

    handleNextEpisodePointerMove = () => {
        this.hoverOnContentModal('next');
    }

    handlePrevEpisodePointerMove = () => {
        this.hoverOnContentModal('prev');
    }

    hoverOnContentModal = (type: string) => {
        const currentEpisode = this._context.currentEpisode.indexEpisode;
        const currentSeason = this._context.currentEpisode.indexSeason;
        if (type === 'next') {
            const nextEpisode = tvShowQueue.GetNextEpisode(currentEpisode, currentSeason, this._context.queue);
            this._context.nextEpisode.indexSeason = nextEpisode.season;
            this._context.nextEpisode.indexEpisode = nextEpisode.episode;
        } else if (type === 'prev') {
            const prevEpisode = tvShowQueue.GetPrevEpisode(currentEpisode, currentSeason, this._context.queue);
            this._context.prevEpisode.indexSeason = prevEpisode.season;
            this._context.prevEpisode.indexEpisode = prevEpisode.episode;
        }

        const episodeModal = new EpisodeModal(this._context, document.querySelector('.watch__wrapper'), type);
        episodeModal.render();
    }

    hoverOffContentModal = () => {
        const episodeModal = document.querySelector('.episode-modal');
        if (episodeModal) {
            episodeModal.remove();
        }
    }

    handleNextEpisodeClick = () => {
        this.clickOnChangeEpisode('next');
    }

    handlePrevEpisodeClick = () => {
        this.clickOnChangeEpisode('prev');
    }

    clickOnChangeEpisode = (type: string) => {
        const currentSeason = this._context.currentEpisode.indexSeason;
        const currentEpisode = this._context.currentEpisode.indexEpisode;

        let indexChangeEpisode;
        if (type === 'next') {
            indexChangeEpisode = tvShowQueue.GetNextEpisode(currentEpisode, currentSeason, this._context.queue);
            if (tvShowQueue.isLastEpisode(indexChangeEpisode.episode, indexChangeEpisode.season, this._context.queue)) {
                const nextContentButton: any = document.querySelector('.player-bar__next-content-btn');
                nextContentButton.hidden = true;
            }

            if (!tvShowQueue.isFirstEpisode(indexChangeEpisode.episode, indexChangeEpisode.season)) {
                const prevContentButton: any = document.querySelector('.player-bar__prev-content-btn');
                prevContentButton.hidden = false;
            }
        } else if (type === 'prev') {
            indexChangeEpisode = tvShowQueue.GetPrevEpisode(currentEpisode, currentSeason, this._context.queue);
            if (tvShowQueue.isFirstEpisode(indexChangeEpisode.episode, indexChangeEpisode.season)) {
                const prevContentButton: any = document.querySelector('.player-bar__prev-content-btn');
                prevContentButton.hidden = true;
            }

            // eslint-disable-next-line max-len
            if (!tvShowQueue.isLastEpisode(indexChangeEpisode.episode, indexChangeEpisode.season, this._context.queue)) {
                const nextContentButton: any = document.querySelector('.player-bar__next-content-btn');
                nextContentButton.hidden = false;
            }
        }

        const contextChangeEpisode = this._context.queue.seasons[indexChangeEpisode.season].
            episodes[indexChangeEpisode.episode];

        const id = this._context.contentId;
        const url = `/watch/${id}?season=${indexChangeEpisode.season + 1}&episode=${indexChangeEpisode.episode + 1}`;
        window.history.replaceState(history.state, null, url);

        const changeEpisode = {
            season: indexChangeEpisode.season,
            episode: indexChangeEpisode.episode,
            video: SERVER_HOST + contextChangeEpisode.video,
            name: contextChangeEpisode.name,
        };

        this._context.currentEpisode.indexSeason = changeEpisode.season;
        this._context.currentEpisode.indexEpisode = changeEpisode.episode;

        const video = document.querySelector('.video');
        video.setAttribute('src', changeEpisode.video);

        const [episodeTitle] = document.getElementsByClassName('player-bar__episode-title');
        const [episodeNumber] = document.getElementsByClassName('player-bar__episode-number');
        episodeTitle.textContent = changeEpisode.name;
        episodeNumber.textContent = `S${changeEpisode.season + 1}:E${changeEpisode.episode + 1}`;

        const episodeModal = document.querySelector('.episode-modal');
        if (episodeModal) {
            episodeModal.remove();
        }

        this._onVideoPlay();
    }

    onFullScreenOn = () => {
        this.watchPage.removeEventListener('mouseover', this.showPlayerBar);
        this.watchPage.addEventListener('mousemove', this.showCursor.bind(this));
        this.watchPage.requestFullscreen();

        const btnBack: HTMLButtonElement = document.querySelector('.watch__back-btn');
        btnBack.style.display = 'none';

        this.changeButton('.player-bar__fullscreen-btn', '.fullscreen-btn__img',
            '/static/img/player-fullscreen-out.svg', 'fullscreenModeOff');

        window.addEventListener('fullscreenchange', this.onFullscreenChange);
    }

    onFullscreenChange = () => {
        if (!document.fullscreenElement) {
            this.onExitFullscreen();
        }
    }

    showCursor = () => {
        const removeCursor = function() {
            const watchPage = document.querySelector('.watch__page');
            if (watchPage) {
                watchPage.setAttribute('style', 'cursor: none;');
            }
        };

        this.watchPage.removeAttribute('style');
        setTimeout(removeCursor, 3000);
    }

    onFullScreenOff = () => {
        document.exitFullscreen();
        this.onExitFullscreen();
    }

    onExitFullscreen = () => {
        this.watchPage.addEventListener('mouseover', this.showPlayerBar);
        this.watchPage.removeEventListener('mousemove', this.showCursor.bind(this));
        const btnBack: any = document.querySelector('.watch__back-btn');
        btnBack.style.display = 'block';

        this.changeButton('.player-bar__fullscreen-btn', '.fullscreen-btn__img',
            '/static/img/player-fullscreen.svg', 'fullscreenModeOn');

        document.querySelector('.watch__page').setAttribute('style', 'cursor: pointer;');
    }

    hideProgressBar = () => {
        this.timeline.setAttribute('style', 'opacity:0;');
    }

    showProgressBar = () => {
        this.timeline.setAttribute('style', 'opacity:1;');
    }

    changeButton(selectorBtn: string, selectorImg: string, attrImg: string, attrEvent: string) {
        const button = document.querySelector(selectorBtn);
        const buttonImg = document.querySelector(selectorImg);
        buttonImg.setAttribute('src', attrImg);
        button.setAttribute('data-event', attrEvent);
    }

    stop() {
        window.removeEventListener('fullscreenchange', this.onFullscreenChange);
        window.removeEventListener('keydown', this.onKeydownSpace);

        eventBus.off(Events.VideoPlay, this._onVideoPlay)
            .off(Events.VideoPause, this._onVideoPause)
            .off(Events.Mute, this._onMuteVolume)
            .off(Events.VolumeOn, this._onVolumeOn)
            .off(Events.FullscreenModeOn, this._onFullScreenOn)
            .off(Events.FullscreenModeOff, this._onFullScreenOff);
    }
}

export default PlayerService;
