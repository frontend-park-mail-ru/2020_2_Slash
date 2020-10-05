import BaseComponent from '../BaseComponent.js';
import Slider from "../Slider/Slider.js";

class ContentBlock extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['ContentBlock.hbs'];
    }

    render() {
        this.context.blocks = Array.from(this.context.blocks, (block) => new Slider({context: block}).render());
        return this.template(this.context);
    }
}

export default ContentBlock;
