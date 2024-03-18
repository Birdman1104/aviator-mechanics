import { lego } from '@armathai/lego';

const getUUID = (() => {
    let i = 0;
    return (name = '') => `${name}${++i}`;
})();

export class ObservableModel {
    protected __name__: string;
    private id: string;

    constructor(name: string) {
        this.__name__ = name;
        this.id = getUUID(this.__name__);
    }

    get uuid() {
        return this.id;
    }

    protected makeObservable(...props: string[]): void {
        lego.observe.makeObservable(this, ...props);
    }

    protected createObservable(property: string, value: unknown): void {
        lego.observe.createObservable(this, property, value);
    }

    protected removeObservable(...props: string[]): void {
        lego.observe.removeObservable(this, ...props);
    }

    public initialize(...args: unknown[]): void {
        void args;
    }

    public destroy() {
        //
    }
}
