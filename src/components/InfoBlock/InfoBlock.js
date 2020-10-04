import BaseComponent from '../BaseComponent.js';
import TabBar from '../TabBar/TabBar.js';
import MainTab from '../MainTab/MainTab.js';

class InfoBlock extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['InfoBlock.hbs'];

        const tabBar = new TabBar({
            context: {
                tabs: [ "О сериале", "Детали"]
            }
        });

        if (this.context.currentTab === "mainTab") {
            const mainTab = new MainTab({
            });
        } else if (this.context.currentTab === "detailsTab") {

        }

        this.context = {
            TabBar: tabBar,
        }
    }

    render() {
        return this.template(this.context);
    }
}

export default InfoBlock;