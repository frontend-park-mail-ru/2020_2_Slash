import BaseComponent from '../BaseComponent.js';

class MiniModal extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['MiniModal.hbs'];

        if (MiniModal.__instance) {
            return MiniModal.__instance;
        }

        MiniModal.__instance = this;

        MiniModal.prototype.onClick = function(event) {
            const {target} = event;
            if (!target.closest('.header__user')) {
                this.remove();
                this.onDestroy();
            }
        }.bind(this);

        this.parent.addEventListener('click', this.onClick);
    }

    render() {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.template(this.context);
        modalDiv.classList.add('mini-modal');
        const header = this.parent.querySelector('.header')
        header.appendChild(modalDiv);
    }

    remove() {
        const modal = this.parent.querySelector('.mini-modal');
        if (modal) {
            modal.remove();
        }
    }

    onDestroy() {
        this.parent.removeEventListener('click', this.onClick);
        MiniModal.__instance = null;
    }
}

export default MiniModal;
