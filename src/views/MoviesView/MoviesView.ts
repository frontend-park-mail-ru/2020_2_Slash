import View from '../View';
import Context from '../../tools/Context';
import Preview from '../../components/Preview/Preview';
import ContentBlock from '../../components/ContentBlock/ContentBlock';
import template from './MoviesView.hbs';
import SubMenuPopup from '../../components/SubMenuPopup/SubMenuPopup';
import EventBus from '../../services/EventBus';
import Events from '../../consts/events';

class MoviesView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context);
        this.template = template;
        this.parent = document.querySelector('.application');

        EventBus.on(Events.RevealPopup, this.renderPopup.bind(this));
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

    renderPopup() {
        const subMenu = new SubMenuPopup(this.context, document.querySelector('.genres'));
        this.insertIntoContext({SubMenu: subMenu.render()});
    }
}

export default MoviesView;
