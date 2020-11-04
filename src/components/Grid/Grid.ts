import Component from '../Component';
import Context from '../../tools/Context';
import template from './Grid.hbs';
import GridItem from '../GridItem/GridItem';

class Grid extends Component {
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render() {
        const list: string[] = [];

        this.context.content.forEach((item: any) => {
            list.push(new GridItem(item).render());
        });

        this.context.content = list;
        return this.template(this.context);
    }
}

export default Grid;
