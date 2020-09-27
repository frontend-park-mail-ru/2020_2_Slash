class BaseView {
    constructor({template, context = {}} = {}) {
        this.root = document.getElementsByClassName('application')[0];
        this.template = template;
        this.context = context;
    }

    show() {
        this.root.innerHTML = this.template(this.context);
        this.onShow();
    }

    hide() {
        this.root.innerHTML = '';
        this.onHide();
    }

    onShow() {}
    onHide() {}
}

export default BaseView;
