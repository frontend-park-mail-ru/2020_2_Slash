import Component from '../Component';
import Context from '../../tools/Context';
import template from './EpisodeQueueModal.hbs';

class EpisodeQueueModal extends Component {
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render() {
        const modal = this.parent.querySelector('.episode-queue-modal');
        if (!modal) {
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = this.template(this.context);
            modalDiv.classList.add('episode-queue-modal');
            this.parent.appendChild(modalDiv);
        }
    }

    remove() {
        const modal = this.parent.querySelector('.episode-queue-modal');
        if (modal) {
            modal.remove();
        }
    }
}

export default EpisodeQueueModal;
