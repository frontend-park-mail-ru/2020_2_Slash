import IView from './IView';
import CustomObject from '../tools/customInterfaces/customObject'

class TBaseView implements IView {
    root: Element;
    context: CustomObject;
    template: any

    constructor(title?: string, template?: any, context?: CustomObject) {
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

    setContext(inputContext: CustomObject) {
        this.context = inputContext;
    }

    addToContext(obj: CustomObject) {
        this.context = (<any>Object).assign(this.context, obj)
    }

    insertIntoContext(...data: CustomObject[]) {
        data.forEach((obj) => {
            this.addToContext(obj)
        });
    }
}

export default TBaseView;
