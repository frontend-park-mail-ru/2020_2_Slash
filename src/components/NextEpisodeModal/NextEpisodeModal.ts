import Component from '../Component';
import Context from '../../tools/Context';
import template from './NextEpisodeModal.hbs';
import {SERVER_HOST} from '../../consts/settings';
import {GetNextEpisode} from '../../tools/helper';

class NextEpisodeModal extends Component {
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render() {
        const nextEpisode = GetNextEpisode(this.context);

        const data = {
            host: SERVER_HOST,
            images: this.context.episodeQueue[nextEpisode.season].episodes[nextEpisode.episode].poster,
            description: this.context.episodeQueue[nextEpisode.season].episodes[nextEpisode.episode].description,
        };

        const modal = this.parent.querySelector('.next-episode-modal');
        if (!modal) {
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = this.template(data);
            modalDiv.classList.add('next-episode-modal');
            this.parent.appendChild(modalDiv);
        }
    }

    remove() {
        const modal = this.parent.querySelector('.next-episode-modal');
        if (modal) {
            modal.remove();
        }
    }
}

export default NextEpisodeModal;
