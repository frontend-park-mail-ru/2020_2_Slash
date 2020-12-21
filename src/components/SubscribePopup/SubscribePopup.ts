import Component from '../Component';
import Context from '../../tools/Context';
import template from './SubscribePopup.hbs';
import EventBus from '../../services/EventBus';
import Routes from '../../consts/routes';
import Events from '../../consts/events';

class SubscribePopup extends Component {
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this.parent.addEventListener('click', this.onClick);
        window.addEventListener('keydown', this.onKeydownEscape);
    }

    render(): any {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.template();
        modalDiv.classList.add('subscribe-popup__wrapper');
        this.parent.appendChild(modalDiv);
    }

    remove = () => {
        const modalDiv = document.querySelector('.subscribe-popup__wrapper');
        if (modalDiv) {
            modalDiv.remove();
        }
        const page = document.querySelector('.scroll-fixed');
        if (page) {
            this.parent.innerHTML = page.innerHTML;
        }
        this.onDestroy();
    }

    onClick = (event: any) => {
        const closingTarget = event.target.classList.contains('blocker');
        if (closingTarget) {
            this.remove();
        }
        const target = event.target.closest('.subscribe-popup__button');
        if (target) {
            this.remove();
            const page = document.querySelector('.scroll-fixed');
            if (page) {
                this.parent.innerHTML = page.innerHTML;
            }
            EventBus.emit(Events.PathChanged, {path: Routes.ProfilePage, info: 'SubscribeTab'});
        }
    }

    onKeydownEscape = (event: any) => {
        if (event.key === 'Escape') {
            this.remove();
        }
    }

    onDestroy() {
        this.parent.removeEventListener('click', this.onClick);
        window.removeEventListener('keydown', this.onKeydownEscape);
    }
}

export default SubscribePopup;
