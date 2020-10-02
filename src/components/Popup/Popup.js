import BaseComponent from '../BaseComponent.js';

class Popup extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Popup.hbs'];

        this.parent.addEventListener('click', this.onClick.bind(this));
    }

    render() {
        return this.template(this.context);
    }

    onClick(event) {
        const {target} = event;
        if (target.classList.contains('popup-wrapper')) {
            const popup = document.querySelector('.popup');
            document.body.classList.remove('scroll-off');
            this.parent.removeChild(popup);
            this.onDestroy();
        }
    }

    onDestroy() {
        this.parent.removeEventListener('click', this.onClick);
    }
}

export default Popup;
