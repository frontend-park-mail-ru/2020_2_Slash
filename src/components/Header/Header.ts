import Component from '../Component';
import Context from '../../tools/Context';
import template from './Header.hbs';
import eventBus from '../../services/EventBus';
import Events from '../../consts/events';
import UserHeader from '../UserHeader/UserHeader';

/**
 * @class
 * Компонента хэдера
 */
class Header extends Component {
    private UserBlock: UserHeader;
    /**
     * Создает экземпляр Header
     *
     * @constructor
     * @this  {Header}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this.UserBlock = new UserHeader(this.context);
        this.context.UserBlock = this.UserBlock.render();

        eventBus.on(Events.UpdateHeader, this.onUpdate.bind(this));
    }

    onUpdate(data: any = {}) {
        this.context.authorized = data.authorized;
        this.context.avatar = data.avatar;

        const userBlock = document.querySelector('.header__user-block');
        if (userBlock) {
            userBlock.innerHTML = this.UserBlock.template(this.context);
        }
    }
}

export default Header;
