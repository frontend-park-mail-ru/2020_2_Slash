import BaseComponent from '../BaseComponent.js';

class Button extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Button.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default Button;
