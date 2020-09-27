class BaseComponent {
    constructor({parent, context = null} = {}) {
        this.parent = parent;
        this.context = context;
    }

    render() {}
    onRender() {}
}

export default BaseComponent;
