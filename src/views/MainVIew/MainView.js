import BaseView from '../BaseView.js';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import Preview from '../../components/Preview/Preview.js';
import Slider from '../../components/Slider/Slider.js';

class MainView extends BaseView {
    constructor(context = {}) {
        super({title: 'Flicks Box', template: null, context: context});
        this.template = Handlebars.templates['MainView.hbs'];
    }

    show() {
        const header = new Header({
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

        const contentBlocks = Array.from(this.context.blocks, (block) => new Slider({context: block}).render());

        const data = {
            Header: header.render(),
            Preview: preview.render(),
            Footer: footer.render(),
            blocks: contentBlocks,
        };

        this.insertIntoContext(data);

        super.show();
    }
}

export default MainView;
