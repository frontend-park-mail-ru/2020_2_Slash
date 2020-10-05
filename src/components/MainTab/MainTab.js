import BaseComponent from '../BaseComponent.js';

class MainTab extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['MainTab.hbs'];
    }

    render() {
        this.context.slicedCast = this.context.cast.slice(0, 3);
        return this.template(this.context);
    }
}

export default MainTab;
