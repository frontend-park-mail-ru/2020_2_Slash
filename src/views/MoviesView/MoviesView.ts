import View from '../View';
import Context from '../../tools/Context';
import Preview from '../../components/Preview/Preview';
import ContentBlock from '../../components/ContentBlock/ContentBlock';
import template from './MoviesView.hbs';
import Grid from '../../components/Grid/Grid';

class MoviesView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        let data: Context;
        if (!this.context.genre) {
            const preview = new Preview({
                preview: this.context.preview,
            });

            const contentBlock = new ContentBlock({
                blocks: this.context.blocks,
            });

            data = {
                Preview: preview.render(),
                Content: contentBlock.render(),
                Genre: 'Жанры',
            };
        } else {
            const grid = new Grid({
                content: this.context.content,
            });
            data = {
                Content: grid.render(),
                Genre: this.context.genre,
            };
        }
        this.insertIntoContext(data);
        super.show(this.template(data));
    }
}

export default MoviesView;
