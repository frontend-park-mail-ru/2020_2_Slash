import View from '../View';
import Context from '../../tools/Context';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import ProfileMenuBar from '../../components/ProfileMenuBar/ProfileMenuBar';
import PInfoFormBuilder from '../../tools/builders/PInfoFormBuilder';
import PSecurityFormBuilder from '../../tools/builders/PSecurityFormBuilder';
import template from './ProfileView.hbs';
import Events from '../../consts/events';
import EventBus from '../../services/EventBus';
import SubscriptionForm from '../../components/SubscriptionForm/SubscriptionForm';

class ProfileView extends View {
    usrInfoBlock: UserInfoBlock;
    menuBar: ProfileMenuBar;

    constructor(context = {}) {
        super('Flicks Box', context);
        this.template = template;
    }

    show() {
        const {avatar, nickname, email} = this.context;

        this.usrInfoBlock = new UserInfoBlock({
            avatar: avatar,
            nickname: nickname,
            email: email,
        });

        this.menuBar = new ProfileMenuBar({
            InfoForm: PInfoFormBuilder.set([
                {
                    id: 'nickname',
                    value: nickname,
                },
                {
                    id: 'email',
                    value: email,
                }]).getForm().render(),
            SecurityForm: PSecurityFormBuilder.getForm().render(),
            SubDate: this.context.subDate,
        });
        EventBus.emit(Events.UpdateSubscription);

        const subscriptionForm = new SubscriptionForm(this.context.subDate);

        const data: Context = {
            UserInfoBlock: this.usrInfoBlock.render(),
            ProfileMenuBar: this.menuBar.render(),
            SubscriptionForm: subscriptionForm.render(),
        };

        this.insertIntoContext(data);

        super.show(this.template(data));
    }

    hide() {
        EventBus.off(Events.SubmitProfileForm, this.menuBar.onSubmit)
            .off(Events.UpdateUserProfile, this.usrInfoBlock.onUpdateProfile)
            .off(Events.UpdateProfileAvatar, this.usrInfoBlock.onUploadAvatar);
        super.hide();
    }
}

export default ProfileView;
