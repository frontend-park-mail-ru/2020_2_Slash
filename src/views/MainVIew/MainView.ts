import TBaseView from '../TBaseView';
import Context from '../../tools/Context';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import Preview from '../../components/Preview/Preview.js';
import ContentBlock from '../../components/ContentBlock/ContentBlock.js';
import template from './MainView.hbs';

class MainView extends TBaseView {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, null, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        const header = new Header({
            parent: this.parent,
            context: {
                authorized: this.context.authorized,
                avatar: this.context.avatar,
            },
        });
        const footer = new Footer();

        const preview = new Preview({
            parent: null,
            context: {
                preview: this.context.preview,
            },
        });

        const contentBlock = new ContentBlock({
            parent: null,
            context: {
                blocks: this.context.blocks,
            },
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
