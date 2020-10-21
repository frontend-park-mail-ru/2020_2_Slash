import View from '../View';
import Context from '../../tools/Context';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Preview from '../../components/Preview/Preview';
import ContentBlock from '../../components/ContentBlock/ContentBlock';
import template from './MainView.hbs';

class MainView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, null, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        const header = new Header({
            authorized: this.context.authorized,
            avatar: this.context.avatar,
        },
            this.parent
        );
        const footer = new Footer();

        const preview = new Preview({
                preview: this.context.preview,
            });

        const contentBlock = new ContentBlock({
                blocks: this.context.blocks,
            });

        const data: Context = {
            Header: header.render(),
            Preview: preview.render(),
            Footer: footer.render(),
            ContentBlock: contentBlock.render(),
        };

        this.insertIntoContext(data);
        super.show();
    }
}

export default MainView;
