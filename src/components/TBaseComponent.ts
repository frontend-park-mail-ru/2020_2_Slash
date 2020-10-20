import Context from '../tools/Context';

class BaseComponent {
    context: Context;
    parent: any;
    template: any;

    constructor(context?: Context, parent?: any) {
        this.parent = parent;
        this.context = context;
    }

    render() {
        return this.template(this.context);
    }
}

export default BaseComponent;
