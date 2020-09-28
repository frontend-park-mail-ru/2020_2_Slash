import BaseComponent from '../BaseComponent.js';

class Footer extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Footer.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default Footer;
