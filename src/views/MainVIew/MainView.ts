import View from '../View';
import Context from '../../tools/Context';
import Preview from '../../components/Preview/Preview';
import ContentBlock from '../../components/ContentBlock/ContentBlock';
import template from './MainView.hbs';

class MainView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        const preview = new Preview({
                preview: this.context.preview,
            });

        const contentBlock = new ContentBlock({
                blocks: this.context.blocks,
            });

        const data: Context = {
            Preview: preview.render(),
            ContentBlock: contentBlock.render(),
        };

        this.insertIntoContext(data);
        super.show(this.template(data));
    }
}

export default MainView;
