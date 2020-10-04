import BaseComponent from '../BaseComponent.js';

class TabBar extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['TabBar.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default TabBar;