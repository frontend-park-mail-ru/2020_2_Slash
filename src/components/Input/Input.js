import BaseComponent from '../BaseComponent.js';

class Input extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Input.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default Input;
