import BaseComponent from '../BaseComponent.js';

class UserInfoBlock extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['UserInfoBlock.hbs'];
    }

    render() {
        return this.template(this.context);
    }
}

export default UserInfoBlock;