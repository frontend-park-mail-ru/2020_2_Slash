import View from '../View';
import Context from '../../tools/Context';
import Header from '../../components/Header/Header';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import ProfileMenuBar from '../../components/ProfileMenuBar/ProfileMenuBar';
import Footer from '../../components/Footer/Footer';
import PInfoFormBuilder from '../../tools/builders/PInfoFormBuilder.js';
import PSecurityFormBuilder from '../../tools/builders/PSecurityFormBuilder.js';
import template from './ProfileView.hbs';
import EventBus from "../../services/EventBus";
import Events from "../../consts/events";

class ProfileView extends View {
    usrInfoBlock: UserInfoBlock;
    menuBar: ProfileMenuBar;

    constructor(context = {}) {
        super('Flicks Box', context);
        this.template = template;
    }

    show() {
        const {authorized, avatar, nickname, email} = this.context;

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
                });

        const data: Context = {
            UserInfoBlock: this.usrInfoBlock.render(),
            ProfileMenuBar: this.menuBar.render(),
        };

        this.insertIntoContext(data);

        super.show(this.template(data));
    }

    hide() {
        EventBus.off(Events.ProfileTabChanged, this.menuBar.onTabChanged)
            .off(Events.SubmitProfileForm, this.menuBar.onSubmit)
            .off(Events.UpdateUserProfile, this.usrInfoBlock.onUpdateProfile)
            .off(Events.UpdateProfileAvatar, this.usrInfoBlock.onUploadAvatar);
        super.hide();
    }
}

export default ProfileView;
