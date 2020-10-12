import CustomObject from '../customInterfaces/customObject'

interface IView {
    root: Element;
    context: CustomObject;
    template: any;

    show(): void;
    hide(): void;
    setContext(inputContext: CustomObject): void;
    addToContext(obj: CustomObject): void;
    insertIntoContext(...data: CustomObject[]): void;
}

export default IView;
