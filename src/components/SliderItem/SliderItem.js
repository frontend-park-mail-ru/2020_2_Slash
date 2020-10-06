import BaseComponent from '../BaseComponent.js';

class SliderItem extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['SliderItem.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default SliderItem;
