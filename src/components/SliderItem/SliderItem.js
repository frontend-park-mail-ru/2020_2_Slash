import BaseComponent from '../BaseComponent.js';
import Events from "../../consts/events.js";
import EventBus from "../../services/EventBus.js";

class SliderItem extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['SliderItem.hbs'];

        EventBus.on(Events.ContentInfoRequested, this.onContentInfoRequested.bind(this));
    }

    render() {
        return this.template(this.context);
    }

    onContentInfoRequested(data = {}) {
        EventBus.emit(Events.PathChanged, data);
    }
}

export default SliderItem;
