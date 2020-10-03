import BaseComponent from '../BaseComponent.js';

class Form extends BaseComponent {
    constructor({parent= null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Form.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default Form;
