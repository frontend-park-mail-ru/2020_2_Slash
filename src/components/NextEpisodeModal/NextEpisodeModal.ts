import Component from '../Component';
import Context from '../../tools/Context';
import template from './NextEpisodeModal.hbs';
import {SERVER_HOST} from '../../consts/settings';

class NextEpisodeModal extends Component {
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render() {
        const nextEpisodeContext = this.context.queue
            .seasons[this.context.nextEpisode.indexSeason]
            .episodes[this.context.nextEpisode.indexEpisode];

        const data = {
            poster: `${SERVER_HOST}${nextEpisodeContext.poster}`,
            description: nextEpisodeContext.description,
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
