interface IView {
    root: Element;
    context: any;
    template: any;

    show(): void;
    hide(): void;
    setContext(inputContext: any): void;
    addToContext(obj: any): void;
    insertIntoContext(...data: any[]): void;
}

export default IView;
