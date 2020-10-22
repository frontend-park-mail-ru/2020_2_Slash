import Context from '../tools/Context';

abstract class Component {
    context: Context;
    parent: HTMLElement;
    template: any;

    protected constructor(context?: Context, parent?: any) {
        this.parent = parent;
        this.context = context;
    }

    render() {
        return this.template(this.context);
    }
}

export default Component;
