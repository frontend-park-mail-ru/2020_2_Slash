import Component from '../Component';
import Context from '../../tools/Context';
import template from './FiltersBlock.hbs';

class FiltersBlock extends Component {
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default FiltersBlock;
