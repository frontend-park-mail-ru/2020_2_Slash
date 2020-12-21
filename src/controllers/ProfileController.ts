import {SERVER_HOST} from '../consts/settings';
import ResponseType from '../tools/ResponseType';
import ProfileView from '../views/ProfileView/ProfileView';
import PaymentForm from '../components/PaymentForm/PaymentForm';
import UserModel from '../models/UserModel';
import Controller from './Controller';
import EventBus from '../services/EventBus';
import {Error} from '../consts/errors';
import Events from '../consts/events';
import Routes from '../consts/routes';
import SubscriptionModel from '../models/SubscriptionModel';
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm';
import {CreateDomElement} from '../tools/helper';

/**
 * @class
 * Контроллер для страницы профиля
 */
class ProfileController extends Controller {
    view: ProfileView;
    subDate: {subscription: boolean, isActive?: boolean, isPaid?: boolean, date?: string};
    subWrapper: Element;

    constructor() {
        super(new ProfileView());

        this.subDate  = {
            subscription: false,
        };

        EventBus.on(Events.UpdateProfileInfo, this.onUpdateProfile.bind(this));
        EventBus.on(Events.UploadAvatar, this.onUploadAvatar.bind(this));
    }

    switchOn(data?: any) {
        UserModel.getProfile().then((response: ResponseType) => {
            let sessionData: any = {
                authorized: false,
            };

            if (!response.error) {
                sessionData.authorized = true;
                const user = response.body.user;
                const avatar = user.avatar ? `${SERVER_HOST}${user.avatar}` : '/static/img/default.svg';
                const {nickname, email} = user;
                sessionData = {...sessionData, avatar, nickname, email};
                SubscriptionModel.checkSubscription().then((response: ResponseType) => {
                    if (!response.error) {
                        if (response.body.subscription) {
                            this.subDate.subscription = true;
                            this.subDate.isActive = !response.body.subscription.is_canceled;
                            this.subDate.isPaid = response.body.subscription.is_paid;
                            this.subDate.date = new Date(response.body.subscription.expires).toLocaleString('en-GB');
                        } else {
                            this.subDate.subscription = false;
                        }

                        sessionData.subDate = this.subDate;
                        this.view.insertIntoContext(sessionData);
                        this.view.show();
                        this.onSwitchOn(data);
                    }
                }).catch((error: Error) => console.log(error));
                return;
            }

            EventBus.emit(Events.PathChanged, {path: Routes.MainPage});
        });
    }

    onSwitchOn(data?: any) {
        if (data.info === 'SubscribeTab') {
            EventBus.emit(Events.ProfileTabChanged, data);
        }
        super.onSwitchOn(data);
        const subscribeBtn = document.querySelector('.create-sub__btn');
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', this.onBtnCreateSubscription);
        }

        const cancelSubBtn = document.querySelector('.cancel-sub__btn');
        if (cancelSubBtn) {
            cancelSubBtn.addEventListener('click', this.onBtnCancelSubscription);
        }

        const refreshSubBtn = document.querySelector('.refresh-sub__btn');
        if (refreshSubBtn) {
            refreshSubBtn.addEventListener('click', this.onBtnRefreshSubscription);
        }

        this.subWrapper = document.querySelector('.subscription__wrapper');
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
        EventBus.off(Events.UpdateProfileInfo, this.onUpdateProfile.bind(this))
            .off(Events.UploadAvatar, this.onUploadAvatar.bind(this));
    }

    /**
     * @function
     * Коллбэк на обновление профиля
     * @param {Object} data - Данные
     */
    onUpdateProfile(data: any = {}) {
        const {nickname, email} = data.params;

        UserModel.updateProfile({
            nickname: nickname,
            email: email,
        }).then((response: ResponseType) => {
            if (!response.error) {
                EventBus.emit(Events.UpdateUserProfile, {
                    nickname: nickname,
                    email: email,
                });
                return;
            }

            data.form.onError(response.error, data.formType);
        }).catch((error: Error) => console.log(error));
    }

    /**
     * @function
     * Коллбэк на загрузку аватарки
     * @param {Object} data - Данные
     */
    onUploadAvatar() {
        const fileUploader = document.getElementById('file-upload');

        fileUploader.addEventListener('change', function() {
            const input: any = this;
            if (input.files && input.files[0]) {
                UserModel.uploadAvatar(input.files[0]).then((response) => {
                    if (response.error) {
                        return;
                    }
                    const data = {
                        avatar: `${SERVER_HOST}/avatars/${response.body.avatar}`,
                    };
                    EventBus.emit(Events.UpdateProfileAvatar, data);
                }).catch((error: Error) => console.log(error));
            }
        });

        fileUploader.click();
    }

    onBtnCreateSubscription = () => {
        document.querySelector('.create-sub__btn').classList.add('hidden');
        document.querySelector('.subscription__prev-label').classList.add('hidden');

        this.subWrapper.innerHTML = new PaymentForm({}).render();
    }

    onBtnCancelSubscription = () => {
        SubscriptionModel.deleteSubscription().then().catch((error: Error) => console.log(error));

        const refreshSubBtn = CreateDomElement('button', {'class': 'refresh-sub__btn subscription__btn'});
        refreshSubBtn.innerText = 'Восстановить подписку';

        const refreshSubLabel = CreateDomElement('button', {
            'class': 'subscription__prev-label subscription__label'});
        refreshSubBtn.innerText = 'В данный момент ваша подписка неактивна. Восстановить?';

        if (this.subDate.isPaid) {
            this.subWrapper.innerHTML = '';
            this.subWrapper.appendChild(refreshSubLabel);
            this.subWrapper.appendChild(refreshSubBtn);
            refreshSubBtn.addEventListener('click', this.onBtnRefreshSubscription);
        } else {
            this.subDate.subscription = false;
            this.subWrapper.innerHTML = new SubscriptionForm(this.subDate).render();
            const subscribeBtn = document.querySelector('.create-sub__btn');
            if (subscribeBtn) {
                subscribeBtn.addEventListener('click', this.onBtnCreateSubscription);
            }
        }
    }

    onBtnRefreshSubscription = () => {
        SubscriptionModel.refreshSubscription().then().catch((error: Error) => console.log(error));
        this.subDate.isActive = true;

        this.subWrapper.innerHTML = new SubscriptionForm(this.subDate).render();
        const subscribeBtn = document.querySelector('.create-sub__btn');
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', this.onBtnCreateSubscription);
        }

        const cancelSubBtn = document.querySelector('.cancel-sub__btn');
        if (cancelSubBtn) {
            cancelSubBtn.addEventListener('click', this.onBtnCancelSubscription);
        }
    }
}

export default ProfileController;
