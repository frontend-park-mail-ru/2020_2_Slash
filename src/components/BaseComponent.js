
class BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        this.parent = parent;
        this.context = context;
    }

    render() {}
}

export default BaseComponent;
