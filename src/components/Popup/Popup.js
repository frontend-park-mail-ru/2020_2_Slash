import BaseComponent from '../BaseComponent.js';

class Popup extends BaseComponent {
    constructor({parent = null, context = {}, addListener = true} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Popup.hbs'];

        if (Popup.__instance) {
            return Popup.__instance;
        }

        Popup.__instance = this;

        Popup.prototype.onClick = function(event) {
            const {target} = event;
            if (target.classList.contains('popup-wrapper') || target.closest('.btn-close__img')) {
                this.remove();
                this.onDestroy();
            }
        }.bind(this);

        this.parent.addEventListener('click', this.onClick);
    }

    render() {
        const popupDiv = document.createElement('div');
        popupDiv.classList.add('popup');
        popupDiv.innerHTML = this.template(this.context);
        this.parent.appendChild(popupDiv);
        document.body.classList.add('scroll-off');
    }

    remove() {
        const popup = document.querySelector('.popup');
        document.body.classList.remove('scroll-off');
        if (popup) {
            this.parent.removeChild(popup);
            this.onDestroy();
        }
    }

    onDestroy() {
        this.parent.removeEventListener('click', this.onClick);
        Popup.__instance = null;
    }
}

export default Popup;
