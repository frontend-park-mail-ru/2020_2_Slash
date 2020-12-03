import Component from '../Component';
import Context from '../../tools/Context';
import template from './NextEpisodeModal.hbs';
import {SERVER_HOST} from '../../consts/settings';

class NextEpisodeModal extends Component {
    private modalType: string;

    constructor(context?: Context, parent?: any, modalType?: string) {
        super(context, parent);
        this.template = template;
        this.modalType= modalType;
    }

    render() {
        if (this.modalType === 'next') {
            const nextEpisodeContext = this.context.queue
                .seasons[this.context.nextEpisode.indexSeason]
                .episodes[this.context.nextEpisode.indexEpisode];

            const data = {
                poster: `${SERVER_HOST}${nextEpisodeContext.poster}`,
                description: nextEpisodeContext.description,
            };

            const modal = this.parent.querySelector('.episode-modal');
            if (!modal) {
                const modalDiv = document.createElement('div');
                modalDiv.innerHTML = this.template(data);
                modalDiv.classList.add('episode-modal');
                this.parent.appendChild(modalDiv);
            }
        } else if (this.modalType === 'prev') {
            const prevEpisodeContext = this.context.queue
                .seasons[this.context.prevEpisode.indexSeason]
                .episodes[this.context.prevEpisode.indexEpisode];

            const data = {
                poster: `${SERVER_HOST}${prevEpisodeContext.poster}`,
                description: prevEpisodeContext.description,
            };

            const modal = this.parent.querySelector('.episode-modal');
            if (!modal) {
                const modalDiv = document.createElement('div');
                modalDiv.innerHTML = this.template(data);
                modalDiv.classList.add('episode-modal');
                this.parent.appendChild(modalDiv);
            }
        }
    }
}

export default NextEpisodeModal;
