import BaseView from '../BaseView.js';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import Preview from '../../components/Preview/Preview.js';
import ContentBlock from '../../components/ContentBlock/ContentBlock.js';
import ContentService from '../../services/ContentService.js';

class MainView extends BaseView {
    constructor({title = 'Flicks box', context = {}} = {}) {
        super({title: title, template: null, context: context});
        this.template = Handlebars.templates['MainView.hbs'];
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
            context: {
                preview: this.context.preview,
            },
        });

        const contentBlock = new ContentBlock({
            context: {
                blocks: this.context.blocks,
            },
        });

        const data = {
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
