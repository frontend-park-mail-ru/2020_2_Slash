import BaseComponent from '../BaseComponent.js';

class DetailsTab extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['DetailsTab.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default DetailsTab;
