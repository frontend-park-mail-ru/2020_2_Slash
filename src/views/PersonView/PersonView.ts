import View from '../View';
import template from './PersonView.hbs';
import Grid from '../../components/Grid/Grid';

class PersonView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        const contentPopup = document.querySelector('.content-popup');
        if (contentPopup) {
            contentPopup.remove();
        }

        const grid = new Grid({
            content: this.context.content,
        });
        const data = {
            Content: grid.render(),
            person: this.context.actor,
        };
        this.insertIntoContext(data);
        super.show(this.template(data));
    }
}

export default PersonView;
