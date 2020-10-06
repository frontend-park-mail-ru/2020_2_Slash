import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';
import MiniModal from "../MiniModal/MiniModal.js";

class Header extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Header.hbs'];

        if (Header.__instance) {
            return Header.__instance;
        }

        Header.__instance = this;
    }

    render() {
        return this.template(this.context);
    }
}

export default Header;
