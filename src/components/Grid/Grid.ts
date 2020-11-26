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

        const {content} = this.context;
        if (content) {
            content.forEach((item: any) => {
                list.push(new GridItem(item).render());
            });
        }

        if (!this.context.column) {
            this.context.column = 6;
        }

        this.context.content = list;
        return list.length > 0 ? this.template(this.context) : '';
    }
}

export default Grid;
