import BaseComponent from '../BaseComponent.js';
import TabBar from '../TabBar/TabBar.js';
import MainTab from '../MainTab/MainTab.js';
import DetailsTab from '../DetailsTab/DetailsTab.js';
import EventBus from "../../services/EventBus.js";
import Events from "../../consts/events.js";

class InfoBlock extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['InfoBlock.hbs'];

        this.tabBar = new TabBar({
            context: {
                tabs: [
                    {
                        key: 'mainTab',
                        value: 'О фильме'
                    },
                    {
                        key: 'detailsTab',
                        value: 'Детали'
                    }],
            }
        });

        this.context.CurrentTab = new MainTab({
            context: this.context.contentData,
        }).render();

        EventBus.on(Events.ContentInfoTabChanged, this.tabChanged.bind(this));

        this.context.TabBar = this.tabBar.render();
    }

    tabChanged(data) {
        if (data.tab === 'mainTab') {
            this.context.CurrentTab = new MainTab({
                context: this.context.contentData,
            }).render();
        } else {
            this.context.CurrentTab = new DetailsTab({
                context: this.context.contentData,
            }).render();
        }

        const currentInfoBlock = document.querySelector(`.info-block_tab`);

        currentInfoBlock.innerHTML = this.context.CurrentTab;
    }

    deleteOpenedInfoBlock() {
        const openedInfoBlock = document.querySelector(`.content__info-block-wrapper`);

        if (openedInfoBlock) {
            const closestSlider = openedInfoBlock.closest('.content__slider-container');
            closestSlider.removeChild(openedInfoBlock);
            const closestSliderItem = closestSlider.querySelector(`.slider-item_selected`);
            closestSliderItem.querySelector(`.slider-item__arrow`).classList.add('hidden');
            closestSliderItem.classList.remove('slider-item_selected');
            closestSliderItem.classList.add('content__slider-item');
            closestSliderItem.classList.remove('slider-item_selected_hover-off');
        }
    }

    render() {
        this.deleteOpenedInfoBlock()

        const currentButtonInfo = document.querySelector(`button.slider-item__more-btn[data-id='${this.context.contentId}']`);

        const currentSliderItem = currentButtonInfo.closest('.content__slider-item');
        currentSliderItem.classList.add('slider-item_selected');
        currentSliderItem.classList.remove('content__slider-item');
        currentSliderItem.classList.add('slider-item_selected_hover-off');
        currentSliderItem.querySelector(`.slider-item__arrow`).classList.remove('hidden');

        const closestSlider = currentButtonInfo.closest('.content__slider-container');

        closestSlider.innerHTML += this.template(this.context);
    }
}

export default InfoBlock;
