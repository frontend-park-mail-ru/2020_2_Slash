import setTime from '../tools/time';
import eventBus from './EventBus';
import Events from '../consts/events';
import NextEpisodeModal from '../components/NextEpisodeModal/NextEpisodeModal';
import {SERVER_HOST} from '../consts/settings';
import {GetNextEpisode, GetPrevEpisode, isLastEpisode, isFirstEpisode} from '../tools/helper';

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

        this.video.addEventListener('timeupdate', this.onUpdateTime.bind(this));

        this.timeline.addEventListener('click', this.onTimelineUpdate.bind(this));
        this.timeline.addEventListener('pointermove', this.onHoverTimeline.bind(this));
        this.timeline.addEventListener('pointerout', this.onHoverOffTimeline.bind(this));

        const soundBar = document.querySelector('.player-bar__volume-bar');
        soundBar.addEventListener('click', this.onVolumeUpdate.bind(this));

        const volumeBar = document.querySelector('.player-bar__volume');
        volumeBar.addEventListener('pointermove', this.hideProgressBar.bind(this));
        volumeBar.addEventListener('pointerout', this.showProgressBar.bind(this));

        const nextContentButton = document.querySelector('.player-bar__next-content-btn');
        nextContentButton.addEventListener('pointermove', this.hoverOnNextContentModal.bind(this));
        nextContentButton.addEventListener('pointerout', this.hoverOffContentModal.bind(this));
        nextContentButton.addEventListener('click', this.clickOnNextContentModal.bind(this));

        const prevContentButton = document.querySelector('.player-bar__prev-content-btn');
        prevContentButton.addEventListener('pointermove', this.hoverOnPrevContentModal.bind(this));
        prevContentButton.addEventListener('pointerout', this.hoverOffContentModal.bind(this));
        prevContentButton.addEventListener('click', this.clickOnPrevContentModal.bind(this));

        document.addEventListener('DOMContentLoaded', function() {
            const button = document.querySelector('.player-bar__play-btn');
            const buttonImg = document.querySelector('.player-play-btn__img');
            buttonImg.setAttribute('src', '/static/img/player-play.svg');
            button.removeAttribute('data-event');
            button.setAttribute('data-event', 'videoPlay');
        });

        const indexCurrentEpisode = {
            season: this._context.currentEpisode.indexSeason,
            episode: this._context.currentEpisode.indexEpisode,
        };

        if (isLastEpisode(indexCurrentEpisode.episode, indexCurrentEpisode.season, this._context.queue)) {
            const nextContentButton: any = document.querySelector('.player-bar__next-content-btn');
            nextContentButton.hidden = true;
        }

        if (isFirstEpisode(indexCurrentEpisode.episode, indexCurrentEpisode.season)) {
            const prevContentButton: any = document.querySelector('.player-bar__prev-content-btn');
            prevContentButton.hidden = true;
        }
    }

    onVideoPlay() {
        this.video.play();
        this.video.setAttribute('data-event', 'videoPause');
        this.changeButton('.player-bar__play-btn', '.player-play-btn__img',
            '/static/img/player-pause.svg', 'videoPause');
    }

    onVideoPause() {
        this.video.pause();
        this.video.setAttribute('data-event', 'videoPlay');
        this.changeButton('.player-bar__play-btn', '.player-play-btn__img',
            '/static/img/player-play.svg', 'videoPlay');
    }

    onTimelineUpdate(event: any) {
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

    onHoverTimeline(event: any) {
        const width = this.timeline.clientWidth;
        const currentPosition = event.clientX;
        const timelineMiddle: any = document.getElementsByClassName('timeline__middle')[0];

        timelineMiddle.style.width = `${100 * currentPosition / width}%`;
    }

    onHoverOffTimeline() {
        const timelineMiddle: any = document.getElementsByClassName('timeline__middle')[0];

        timelineMiddle.style.width = '0%';
    }

    onVolumeUpdate(event: any) {
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

    onMuteVolume() {
        this.setVolumeValue(0);

        this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
            '/static/img/player-mute.svg', 'volumeOn');
    }

    onVolumeOn() {
        this.setVolumeValue(0.5);

        this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
            '/static/img/player-sound.svg', 'mute');
    }

    onUpdateTime() {
        const currentTime = this.video.currentTime;
        let duration = this.video.duration;
        if (!duration) {
            duration = 1;
        }
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

    hoverOnNextContentModal() {
        const currentEpisode = this._context.currentEpisode.indexEpisode;
        const currentSeason = this._context.currentEpisode.indexSeason;
        const nextEpisode = GetNextEpisode(currentEpisode, currentSeason, this._context.queue);

        this._context.nextEpisode.indexSeason = nextEpisode.season;
        this._context.nextEpisode.indexEpisode = nextEpisode.episode;

        const nextEpisodeModal = new NextEpisodeModal(this._context, document.querySelector('.watch__wrapper'), 'next');
        nextEpisodeModal.render();
    }

    hoverOffContentModal() {
        const episodeModal = document.querySelector('.episode-modal');
        if (episodeModal) {
            episodeModal.remove();
        }
    }

    clickOnNextContentModal() {
        const currentSeason = this._context.currentEpisode.indexSeason;
        const currentEpisode = this._context.currentEpisode.indexEpisode;

        const indexNextEpisode = GetNextEpisode(currentEpisode, currentSeason, this._context.queue);

        if (isLastEpisode(indexNextEpisode.episode, indexNextEpisode.season, this._context.queue)) {
            const nextContentButton: any = document.querySelector('.player-bar__next-content-btn');
            nextContentButton.hidden = true;
        }

        if (!isFirstEpisode(indexNextEpisode.episode, indexNextEpisode.season)) {
            const prevContentButton: any = document.querySelector('.player-bar__prev-content-btn');
            prevContentButton.hidden = false;
        }

        const contextNextEpisode = this._context.queue.seasons[indexNextEpisode.season].
            episodes[indexNextEpisode.episode];

        window.history.replaceState(history.state, null,
            // eslint-disable-next-line max-len
            `/watch/${this._context.contentId}?season=${indexNextEpisode.season + 1}&episode=${indexNextEpisode.episode + 1}`);

        const nextEpisode = {
            season: indexNextEpisode.season,
            episode: indexNextEpisode.episode,
            video: SERVER_HOST + contextNextEpisode.video,
            name: contextNextEpisode.name,
        };

        this._context.currentEpisode.indexSeason = nextEpisode.season;
        this._context.currentEpisode.indexEpisode = nextEpisode.episode;

        const video = document.querySelector('.video');
        video.setAttribute('src', nextEpisode.video);

        const episodeTitle: any = document.getElementsByClassName('player-bar__episode-title')[0];
        const episodeNumber: any = document.getElementsByClassName('player-bar__episode-number')[0];
        episodeTitle.innerText = nextEpisode.name;
        episodeNumber.innerText = `S${nextEpisode.season + 1}:E${nextEpisode.episode + 1}`;

        const episodeModal = document.querySelector('.episode-modal');
        if (episodeModal) {
            episodeModal.remove();
        }

        this._onVideoPlay();
    }

    hoverOnPrevContentModal() {
        const currentEpisode = this._context.currentEpisode.indexEpisode;
        const currentSeason = this._context.currentEpisode.indexSeason;

        const prevEpisode = GetPrevEpisode(currentEpisode, currentSeason, this._context.queue);
        this._context.prevEpisode.indexSeason = prevEpisode.season;
        this._context.prevEpisode.indexEpisode = prevEpisode.episode;

        const prevEpisodeModal = new NextEpisodeModal(this._context, document.querySelector('.watch__wrapper'), 'prev');
        prevEpisodeModal.render();
    }

    clickOnPrevContentModal() {
        const currentSeason = this._context.currentEpisode.indexSeason;
        const currentEpisode = this._context.currentEpisode.indexEpisode;

        const indexPrevEpisode = GetPrevEpisode(currentEpisode, currentSeason, this._context.queue);

        if (isFirstEpisode(indexPrevEpisode.episode, indexPrevEpisode.season)) {
            const prevContentButton: any = document.querySelector('.player-bar__prev-content-btn');
            prevContentButton.hidden = true;
        }

        if (!isLastEpisode(indexPrevEpisode.episode, indexPrevEpisode.season, this._context.queue)) {
            const nextContentButton: any = document.querySelector('.player-bar__next-content-btn');
            nextContentButton.hidden = false;
        }

        const contextPrevEpisode = this._context.queue.seasons[indexPrevEpisode.season].
            episodes[indexPrevEpisode.episode];

        window.history.replaceState(history.state, null,
            // eslint-disable-next-line max-len
            `/watch/${this._context.contentId}?season=${indexPrevEpisode.season + 1}&episode=${indexPrevEpisode.episode + 1}`);

        const prevEpisode = {
            season: indexPrevEpisode.season,
            episode: indexPrevEpisode.episode,
            video: SERVER_HOST + contextPrevEpisode.video,
            name: contextPrevEpisode.name,
        };

        this._context.currentEpisode.indexSeason = prevEpisode.season;
        this._context.currentEpisode.indexEpisode = prevEpisode.episode;

        const video = document.querySelector('.video');
        video.setAttribute('src', prevEpisode.video);

        const episodeTitle: any = document.getElementsByClassName('player-bar__episode-title')[0];
        const episodeNumber: any = document.getElementsByClassName('player-bar__episode-number')[0];
        episodeTitle.innerText = prevEpisode.name;
        episodeNumber.innerText = `S${prevEpisode.season + 1}:E${prevEpisode.episode + 1}`;

        const episodeModal = document.querySelector('.episode-modal');
        if (episodeModal) {
            episodeModal.remove();
        }

        this._onVideoPlay();
    }

    onFullScreenOn() {
        document.querySelector('.watch__page').requestFullscreen();

        const btnBack: HTMLButtonElement = document.querySelector('.watch__back-btn');
        btnBack.style.display = 'none';

        this.changeButton('.player-bar__fullscreen-btn', '.fullscreen-btn__img',
            '/static/img/player-fullscreen-out.svg', 'fullscreenModeOff');
    }

    onFullScreenOff() {
        document.exitFullscreen();

        const btnBack: any = document.querySelector('.watch__back-btn');
        btnBack.style.display = 'block';

        this.changeButton('.player-bar__fullscreen-btn', '.fullscreen-btn__img',
            '/static/img/player-fullscreen.svg', 'fullscreenModeOn');
    }

    hideProgressBar() {
        this.timeline.setAttribute('style', 'opacity:0;');
    }

    showProgressBar() {
        this.timeline.setAttribute('style', 'opacity:1;');
    }

    changeButton(selectorBtn: string, selectorImg: string, attrImg: string, attrEvent: string) {
        const button = document.querySelector(selectorBtn);
        const buttonImg = document.querySelector(selectorImg);
        buttonImg.setAttribute('src', attrImg);
        button.setAttribute('data-event', attrEvent);
    }

    stop() {
        eventBus.off(Events.VideoPlay, this._onVideoPlay)
            .off(Events.VideoPause, this._onVideoPause)
            .off(Events.Mute, this._onMuteVolume)
            .off(Events.VolumeOn, this._onVolumeOn)
            .off(Events.FullscreenModeOn, this._onFullScreenOn)
            .off(Events.FullscreenModeOff, this._onFullScreenOff);
    }
}

export default PlayerService;
