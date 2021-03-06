import Context from '../tools/Context';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import template from './View.hbs';

abstract class View {
    root: Element;
    main: Element;
    context: Context;
    template: any;
    baseTemplate: any;
    typeView: string;
    header: Header;
    footer: Footer;

    protected constructor(title?: string, context?: Context, type?: string) {
        document.title = title;
        this.root = document.querySelector('.application');
        this.context = context;
        this.baseTemplate = template;
        this.typeView = type;
    }

    show(contentTemplate: any) {
        if (!document.querySelector('.header__logo') && this.typeView !== 'player') {
            this.header = new Header({
                authorized: this.context.authorized,
                avatar: this.context.avatar,
            },
            this.root,
            );

            this.footer = new Footer();

            this.context.Header = this.header.render();
            this.context.Footer = this.footer.render();
            this.root.innerHTML = this.baseTemplate(this.context);
        } else if (this.typeView === 'player') {
            this.root.innerHTML = contentTemplate;
        }
        this.main = this.root.querySelector('.main');

        if (this.main) {
            this.main.innerHTML = contentTemplate;
        }
    }

    hide() {
        if (this.typeView === 'player') {
            this.root.innerHTML = '';
        } else if (this.main) {
            this.main.innerHTML = '';
        }
    }

    setContext(inputContext: Context) {
        this.context = inputContext;
    }

    addToContext(obj: Context) {
        this.context = {...this.context, ...obj};
    }

    insertIntoContext(...data: Context[]) {
        data.forEach((obj) => {
            this.addToContext(obj);
        });
    }
}

export default View;
