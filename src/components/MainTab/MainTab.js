import BaseComponent from '../BaseComponent.js';

class MainTab extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['MainTab.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default MainTab;