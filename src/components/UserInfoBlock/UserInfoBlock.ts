import Component from '../Component';
import Context from '../../tools/Context';
import template from './UserInfoBlock.hbs';
import eventBus from '../../services/EventBus';
import Events from '../../consts/events';

/**
 * @class
 * Компонента инфо пользователя для страницы профиля - ник, почта, автарка
 */
class UserInfoBlock extends Component {
    /**
     * Создает экземпляр UserInfoBlock
     *
     * @constructor
     * @this  {UserInfoBlock}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        eventBus.on(Events.UpdateUserProfile, this.onUpdateProfile)
            .on(Events.UpdateProfileAvatar, this.onUploadAvatar);
    }

    onUpdateProfile = (data: any = {}) => {
        this.context.nickname = data.nickname;
        this.context.email = data.email;

        const nicknameLabel = document.querySelector('.user-meta__nickname');
        const emailLabel = document.querySelector('.user-meta__email');

        nicknameLabel.innerHTML = data.nickname;
        emailLabel.innerHTML = data.email;
    }

    onUploadAvatar = (data: any = {}) => {
        this.context.avatar = data.avatar;
        const avatarBackground = document.querySelector('.profile-view__user-info');
        avatarBackground.setAttribute('style', `background-image: url('${data.avatar}');`);
        const avatar = document.querySelector('.user-meta__avatar');
        avatar.setAttribute('src', `${data.avatar}`);

        const headerData = {
            avatar: data.avatar,
            authorized: true,
        };
        eventBus.emit(Events.UpdateHeader, headerData);
    }
}

export default UserInfoBlock;
