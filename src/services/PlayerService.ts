import setTime from '../tools/time';
import EventBus from './EventBus';
import Events from '../consts/events';

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

    constructor() {
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
        EventBus.on(Events.VideoPlay, this._onVideoPlay)
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

        document.addEventListener('DOMContentLoaded', function() {
            const button = document.querySelector('.player-bar__play-btn');
            const buttonImg = document.querySelector('.player-play-btn__img');
            buttonImg.setAttribute('src', '/static/img/player-play.svg');
            button.removeAttribute('data-event');
            button.setAttribute('data-event', 'videoPlay');
        });
    }

    onVideoPlay(event: any) {
        this.video.play();
        this.video.setAttribute('data-event', 'videoPause');
        this.changeButton('.player-bar__play-btn', '.player-play-btn__img',
            '/static/img/player-pause.svg', 'videoPause');
    }

    onVideoPause(event: any) {
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

    onHoverOffTimeline(event: any) {
        const timelineMiddle: any = document.getElementsByClassName('timeline__middle')[0];

        timelineMiddle.style.width = '0%';
    }

    onVolumeUpdate(event: any) {
        this.video.volume = event.target.value;
        this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
            '/static/img/player-sound.svg', 'mute');
    }

    setVolumeValue(value: number) {
        const volumeBar: any = document.getElementsByTagName('input')[0];

        volumeBar.value = value;
        this.video.volume = value;
    }

    onMuteVolume(event: any) {
        this.setVolumeValue(0);

        this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
            '/static/img/player-mute.svg', 'volumeOn');
    }

    onVolumeOn(event: any) {
        this.setVolumeValue(0.5);

        this.changeButton('.player-bar__volume-btn', '.volume-btn__img',
            '/static/img/player-sound.svg', 'mute');
    }

    onUpdateTime(event: any) {
        const currentTime = this.video.currentTime;
        const duration = this.video.duration;

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

    onFullScreenOn(event: any) {
        document.querySelector('.watch__page').requestFullscreen();

        const btnBack = document.querySelector('.watch__back-btn');
        btnBack.style.display = 'none';

        this.changeButton('.player-bar__fullscreen-btn', '.fullscreen-btn__img',
            '/static/img/player-fullscreen-out.svg', 'fullscreenModeOff');
    }

    onFullScreenOff(event: any) {
        document.exitFullscreen();

        const btnBack: any = document.querySelector('.watch__back-btn');
        btnBack.style.display = 'block';

        this.changeButton('.player-bar__fullscreen-btn', '.fullscreen-btn__img',
            '/static/img/player-fullscreen.svg', 'fullscreenModeOn');
    }

    hideProgressBar(event: any) {
        this.timeline.setAttribute('style', 'opacity:0;');
    }

    showProgressBar(event: any) {
        this.timeline.setAttribute('style', 'opacity:1;');
    }

    changeButton(selectorBtn: string, selectorImg: string, attrImg: string, attrEvent: string) {
        const button = document.querySelector(selectorBtn);
        const buttonImg = document.querySelector(selectorImg);
        buttonImg.setAttribute('src', attrImg);
        button.removeAttribute('data-event');
        button.setAttribute('data-event', attrEvent);
    }

    stop() {
        EventBus.off(Events.VideoPlay, this._onVideoPlay)
            .off(Events.VideoPause, this._onVideoPause)
            .off(Events.Mute, this._onMuteVolume)
            .off(Events.VolumeOn, this._onVolumeOn)
            .off(Events.FullscreenModeOn, this._onFullScreenOn)
            .off(Events.FullscreenModeOff, this._onFullScreenOff);
    }
}

export default PlayerService;
