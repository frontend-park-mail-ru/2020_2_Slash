import View from '../View';
import template from './AdminView.hbs';
import MovieForm from '../../components/MovieForm/MovieForm';

class AdminView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        this.context.CurrentForm = new MovieForm(this.context).render();
        super.show(this.template(this.context));
    }
}

export default AdminView;
