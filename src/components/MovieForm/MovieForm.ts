import Component from '../Component';
import Context from '../../tools/Context';
import template from './MovieForm.hbs';
import DropdownList from '../DropdownList/DropdownList';

class MovieForm extends Component {
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render(): any {
        this.context.DirDropdown = new DropdownList({li: this.context.directors}).render();
        this.context.ActDropdown = new DropdownList({li: this.context.actors}).render();
        this.context.CountDropdown = new DropdownList({li: this.context.countries}).render();
        return super.render();
    }
}

export default MovieForm;
