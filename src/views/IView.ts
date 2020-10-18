import Context from '../tools/Context';

interface IView {
    root: Element;
    context: Context;
    template: any;

    show(): void;
    hide(): void;
    setContext(inputContext: Context): void;
    addToContext(obj: Context): void;
    insertIntoContext(...data: Context[]): void;
}

export default IView;
