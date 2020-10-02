class BaseView {
    constructor({title, template, context = {}}) {
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

    setContext(inputContext) {
        this.context = inputContext;
    }

    addToContext(key, value) {
        this.context[key] = value;
    }

    insertIntoContext(...data) {
        data.forEach((obj) => Object.entries(obj).forEach(([key, value]) => this.addToContext(key, value)));
    }
}

export default BaseView;
