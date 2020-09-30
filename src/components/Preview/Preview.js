import BaseComponent from '../BaseComponent.js';

class Preview extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Preview.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default Preview;
