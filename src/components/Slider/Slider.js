import BaseComponent from '../BaseComponent.js';
import SliderItem from "../SliderItem/SliderItem.js";

class Slider extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Slider.hbs'];
    }

    render() {
        this.context.content = Array.from(this.context.content, (item) => new SliderItem({context: item}).render());
        return this.template(this.context);
    }
}

export default Slider;
