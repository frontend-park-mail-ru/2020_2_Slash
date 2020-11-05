export function CreateDomElement(tagName: string, attrs?: {[key:string]: string}) {
    const element = document.createElement(tagName);

    if (attrs) {
        Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    }

    return element;
}
