import BaseComponent from '../BaseComponent.js';

class Header extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Header.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default Header;
