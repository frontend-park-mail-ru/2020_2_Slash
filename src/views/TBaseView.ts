import IView from './IView';
import Context from '../tools/Context';

class TBaseView implements IView {
    root: Element;
    context: Context;
    template: any

    constructor(title?: string, template?: any, context?: Context) {
        document.title = title;
        this.root = document.querySelector('.application');
        this.template = template;
        this.context = context;
    }

    show() {
        this.root.innerHTML = this.template(this.context);
    }

    hide() {
        this.root.innerHTML = '';
    }

    setContext(inputContext: Context) {
        this.context = inputContext;
    }

    addToContext(obj: Context) {
        this.context = (<any>Object).assign(this.context, obj)
    }

    insertIntoContext(...data: Context[]) {
        data.forEach((obj) => {
            this.addToContext(obj)
        });
    }
}

export default TBaseView;
