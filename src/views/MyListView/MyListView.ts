import View from '../View';
import Context from '../../tools/Context';
import template from '../MainVIew/MainView.hbs';
import Grid from '../../components/Grid/Grid';

class MyListView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        const grid = new Grid({
            title:   this.context.title,
            content: this.context.content,
        });

        const data: Context = {
            ContentBlock: grid.render(),
        };

        this.insertIntoContext(data);
        super.show(this.template(data));
    }
}

export default MyListView;
