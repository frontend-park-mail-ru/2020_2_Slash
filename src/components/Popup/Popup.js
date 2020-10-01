import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';

class Popup extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Popup.hbs'];

        EventBus.on('click', this.onClick.bind(this));
    }

    render() {
        return this.template(this.context);
    }

    onClick() {
        // отслеживать клики по пустому пространству
        // вызывать onDestroy по клику в пустоту
    }

    onDestroy() {
        EventBus.off('click', this.onClick);
    }
}

export default Popup;
