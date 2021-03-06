import Modals from '../../consts/modals';
import MiniModal from '../../components/MiniModal/MiniModal';

class ModalBuilder {
    private readonly app: Element;

    constructor() {
        this.app = document.querySelector('.application');
    }

    build(modalStatus: string) {
        if (modalStatus === Modals.authMini) {
            return this.buildAuthModal();
        }

        return this.buildUnauthModal();
    }

    buildAuthModal() {
        return new MiniModal({
            buttons: [
                {
                    title: 'Профиль',
                    event: 'pathChanged',
                    path: '/profile',
                    modalStatus: '',
                },
                {
                    title: 'Выйти',
                    event: 'logoutUser',
                    path: '',
                    modalStatus: '',
                },
            ],
        },
        this.app,
        );
    }

    buildUnauthModal() {
        return new MiniModal({
            buttons: [
                {
                    title: 'Вход',
                    event: 'revealPopup',
                    path: '',
                    modalStatus: Modals.signin,
                },
                {
                    title: 'Регистрация',
                    event: 'revealPopup',
                    path: '',
                    modalStatus: Modals.signup,
                },
            ],
        },
        this.app,
        );
    }
}

export default new ModalBuilder();
