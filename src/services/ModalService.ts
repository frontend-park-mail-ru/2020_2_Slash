import Modals from '../consts/modals';
import SignupBuilderForm from '../tools/builders/SignupFormBuilder';
import LoginFormBuilder from '../tools/builders/LoginFormBuilder';
import Popup from '../components/Popup/Popup';
import eventBus from './EventBus';
import Events from '../consts/events';
import ModalBuilder from '../tools/builders/ModalBuilder';
import MiniModal from '../components/MiniModal/MiniModal';

type Modal = MiniModal | Popup;

/**
 * Класс, отвечающий за логику создания попапов
 * @class
 */
class ModalService {
    private static instance: ModalService;
    private readonly app: HTMLElement;
    private modal: Modal;

    /**
     * Создает экземпляр ModalService или возвращает его
     * @return {this}
     * @constructor
     * @this  {ModalService}
     */
    constructor() {
        this.app = document.querySelector('.application');

        eventBus.on(Events.RevealPopup, this.onRevealPopup.bind(this));
    }

    public static getInstance(): ModalService {
        if (!ModalService.instance) {
            ModalService.instance = new ModalService();
        }

        return ModalService.instance;
    }

    /**
     * @function
     * Колбэк на вызов попапа
     * @param {Object} data - Данные для этого коллбэка
     */
    onRevealPopup(data: any) {
        this.show(data.modalstatus);
    }

    /**
     * @function
     * Создает и рендерит нужный попап
     * @param {string} modalStatus - тип попапа
     */
    show(modalStatus: string) {
        if (this.modal) {
            this.modal.remove();
        }

        switch (modalStatus) {
        case Modals.signup: {
            this.modal = new Popup({
                heading: SignupBuilderForm.getMeta().heading,
                Form: SignupBuilderForm.getForm().render(),
                helper: SignupBuilderForm.getMeta().helper,
            },
            this.app,
            );
            break;
        }
        case Modals.signin: {
            this.modal = new Popup({
                heading: LoginFormBuilder.getMeta().heading,
                Form: LoginFormBuilder.getForm().render(),
                helper: LoginFormBuilder.getMeta().helper,
            },
            this.app,
            );
            break;
        }
        case Modals.authMini: {
            this.modal = ModalBuilder.build(modalStatus);
            break;
        }
        case Modals.unauthMini: {
            this.modal = ModalBuilder.build(modalStatus);
            break;
        }
        }

        if (this.modal) {
            this.modal.render();
        }
    }
}

export default new ModalService();
