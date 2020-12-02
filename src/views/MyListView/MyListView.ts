import View from '../View';
import Context from '../../tools/Context';
import template from '../MyListView/MyListView.hbs';
import Grid from '../../components/Grid/Grid';

class MyListView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        let content: any[] = [];
        content = this.context.content.movies;
        if (this.context.content.tv_shows) {
            content = content.concat(this.context.content.tv_shows);
        }

        const grid = new Grid({
            content: content,
        });

        const data: Context = {
            ContentBlock: grid.render(),
        };

        this.insertIntoContext(data);
        super.show(this.template(data));
    }
}

export default MyListView;
