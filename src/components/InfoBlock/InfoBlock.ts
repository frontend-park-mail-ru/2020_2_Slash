import Component from '../Component';
import Context from '../../tools/Context';
import TabBar from '../TabBar/TabBar';
import MainTab from '../MainTab/MainTab';
import DetailsTab from '../DetailsTab/DetailsTab';
import Events from '../../consts/events';
import template from './InfoBlock.hbs';
import SeasonsTab from '../SeasonsTab/SeasonsTab';
import EventBus from '../../services/EventBus';
import contentType from '../../consts/contentType';

/**
 * @class
 * Компонента инфоблока с фильмом
 */
class InfoBlock extends Component {
    private tabBar: TabBar;
    private MainTab: MainTab;
    private SeasonsTab: SeasonsTab;
    private DetailsTab: DetailsTab;
    private btnSliderItem: HTMLElement;
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
                    key: 'seasonsTab',
                    value: 'Сезоны',
                },
                {
                    key: 'detailsTab',
                    value: 'Детали',
                }],
        });

        if (EventBus.getListeners().contentInfoTabChanged) {
            EventBus.getListeners().contentInfoTabChanged = [];
        }
        EventBus.on(Events.ContentInfoTabChanged, this.onTabChanged);
        if (!EventBus.getListeners().infoBlockClosed) {
            EventBus.on(Events.InfoBlockClosed, this.onInfoBlockClosed.bind(this));
        }
    }

    public addToContext(obj: Context) {
        this.context = {...this.context, ...obj};
    }

    /**
     * Колбэк на изменение вкладки на таб баре
     * @param {Object} data - Данные для этого коллбэка
     */
    onTabChanged = (data: any) => {
        if (data.tab === 'mainTab') {
            this.context.CurrentTab = this.MainTab.render();
        } else if (data.tab === 'detailsTab') {
            this.context.CurrentTab = this.DetailsTab.render();
        } else if (data.tab === 'seasonsTab') {
            this.context.CurrentTab = this.SeasonsTab.render();
        }

        const currentInfoBlock = document.querySelector('.info-block_tab');

        currentInfoBlock.innerHTML = this.context.CurrentTab;

        this.tabBar.onTabChanged(data);
    }

    /**
     * Коллбэк на закрытие инфоблока по крестику
     */
    onInfoBlockClosed() {
        this.deleteOpenedInfoBlock(document.querySelector('.content__info-block-wrapper'));
    }

    /**
     * Удаляет текущий открытый на странице инфоблок с фильмом
     */
    deleteOpenedInfoBlock(openedInfoBlock: Element) {
        if (openedInfoBlock) {
            const prevClosestSlider = openedInfoBlock.closest('.content__slider-container');
            this.unselectSliderItem(prevClosestSlider.querySelector('.slider-item_selected'));

            const closestSlider = openedInfoBlock.closest('.content__slider-container');
            closestSlider.removeChild(openedInfoBlock);
        }
    }

    addTargetButton(targetButton: any) {
        this.context.targetButton = targetButton;
    }

    selectSliderItem(currentSliderItem: HTMLElement) {
        if (currentSliderItem) {
            currentSliderItem.classList.add('slider-item_selected');
            currentSliderItem.classList.remove('content__slider-item');
            currentSliderItem.classList.add('slider-item_selected_hover-off');
            currentSliderItem.querySelector('.slider-item__arrow').classList.remove('hidden');
            currentSliderItem.querySelector('.item__card').setAttribute('data-event', ' ');
        }
    }

    unselectSliderItem(currentSliderItem: HTMLElement) {
        if (currentSliderItem) {
            currentSliderItem.querySelector('.slider-item__arrow').classList.add('hidden');
            currentSliderItem.classList.remove('slider-item_selected');
            currentSliderItem.classList.add('content__slider-item');
            currentSliderItem.classList.remove('slider-item_selected_hover-off');
            currentSliderItem.querySelector('.item__card').setAttribute('data-event',
                'openInfoBlock');
        }
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        this.context.contentData.genres.forEach((genre: any) => {
            genre.type = this.context.contentData.type + 's';
        });

        this.MainTab = new MainTab(this.context.contentData);
        this.DetailsTab = new DetailsTab(this.context.contentData);
        if (this.context.contentData.type === contentType.TVShow) {
            this.context.tvshow.images = this.context.contentData.images;
            this.SeasonsTab = new SeasonsTab(this.context.tvshow);
        }

        this.context.CurrentTab = this.MainTab.render();
        this.context.TabBar = this.tabBar.render();

        const openedInfoBlock = document.querySelector('.content__info-block-wrapper');
        const currentClosestSlider = this.context.targetButton.closest('.content__slider-container');

        if (openedInfoBlock) {
            const prevClosestSlider = openedInfoBlock.closest('.content__slider-container');
            this.unselectSliderItem(prevClosestSlider.querySelector('.slider-item_selected'));
            this.selectSliderItem(this.context.targetButton.closest('.content__slider-item'));
            if (prevClosestSlider === currentClosestSlider) {
                this.onTabChanged({tab: 'mainTab'});
                return;
            }
            this.deleteOpenedInfoBlock(openedInfoBlock);
        }

        this.selectSliderItem(this.context.targetButton.closest('.content__slider-item'));
        if (currentClosestSlider) currentClosestSlider.innerHTML += this.template(this.context);
    }
}

export default InfoBlock;
