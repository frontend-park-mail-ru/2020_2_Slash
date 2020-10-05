import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';

class Header extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Header.hbs'];

        if (Header.__instance) {
            return Header.__instance;
        }

        Header.__instance = this;
        this.parent.addEventListener('click', this.onClick.bind(this));
    }

    onClick(event) {
        const {target} = event;
        const closest = target.closest('.header__user');
        if (closest) {
            EventBus.emit(Events.RevealPopup, closest.dataset);
        }
    }

    render() {
        return this.template(this.context);
    }
}

export default Header;
