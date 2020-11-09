import Component from '../Component';
import Context from '../../tools/Context';
import TabBar from '../TabBar/TabBar';
import MainTab from '../MainTab/MainTab';
import DetailsTab from '../DetailsTab/DetailsTab';
import Events from '../../consts/events';
import eventBus from '../../services/EventBus';
import template from './InfoBlock.hbs';

/**
 * @class
 * Компонента инфоблока с фильмом
 */
class InfoBlock extends Component {
    private tabBar: TabBar;
    /**
     * Создает экземпляр InfoBlock
     *
     * @constructor
     * @this  {InfoBlock}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this.tabBar = new TabBar({
            tabs: [
                {
                    key: 'mainTab',
                    value: 'О фильме',
                },
                {
                    key: 'detailsTab',
                    value: 'Детали',
                }],
        });

        eventBus.on(Events.ContentInfoTabChanged, this.onTabChanged.bind(this));
        eventBus.on(Events.InfoBlockClosed, this.onInfoBlockClosed.bind(this));
    }

    public addToContext(obj: Context) {
        this.context = {...this.context, ...obj};
    }

    /**
     * Колбэк на изменение вкладки на таб баре
     * @param {Object} data - Данные для этого коллбэка
     */
    onTabChanged(data: any) {
        if (data.tab === 'mainTab') {
            this.context.CurrentTab = new MainTab(this.context.contentData).render();
        } else {
            this.context.CurrentTab = new DetailsTab(this.context.contentData).render();
        }

        const currentInfoBlock = document.querySelector('.info-block_tab');

        currentInfoBlock.innerHTML = this.context.CurrentTab;
    }

    /**
     * Коллбэк на закрытие инфоблока по крестику
     */
    onInfoBlockClosed() {
        this.deleteOpenedInfoBlock();
    }

    /**
     * Удаляет текущий открытый на странице инфоблок с фильмом
     */
    deleteOpenedInfoBlock() {
        const openedInfoBlock = document.querySelector('.content__info-block-wrapper');

        if (openedInfoBlock) {
            const closestSlider = openedInfoBlock.closest('.content__slider-container');
            closestSlider.removeChild(openedInfoBlock);
            const closestSliderItem = closestSlider.querySelector('.slider-item_selected');
            closestSliderItem.querySelector('.slider-item__arrow').classList.add('hidden');
            closestSliderItem.classList.remove('slider-item_selected');
            closestSliderItem.classList.add('content__slider-item');
            closestSliderItem.classList.remove('slider-item_selected_hover-off');
        }
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        this.context.CurrentTab = new MainTab(this.context.contentData).render();
        this.context.TabBar = this.tabBar.render();

        this.deleteOpenedInfoBlock();

        const currentSliderItem = this.context.targetButton.closest('.content__slider-item');
        currentSliderItem.classList.add('slider-item_selected');
        currentSliderItem.classList.remove('content__slider-item');
        currentSliderItem.classList.add('slider-item_selected_hover-off');
        currentSliderItem.querySelector('.slider-item__arrow').classList.remove('hidden');

        const closestSlider = this.context.targetButton.closest('.content__slider-container');

        closestSlider.innerHTML += this.template(this.context);
    }
}

export default InfoBlock;
