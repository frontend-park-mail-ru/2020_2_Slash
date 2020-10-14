
class BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        this.parent = parent;
        this.context = context;
    }

    render() {
        return this.template(this.context);
    }
}

export default BaseComponent;
