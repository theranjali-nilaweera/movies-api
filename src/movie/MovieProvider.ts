export class MovieProvider {
    public displayName: string;
    public name: string;
    public idPrefix: string;

    constructor(displayName: string, name: string, idPrefix: string) {
        this.displayName = displayName;
        this.name = name;
        this.idPrefix = idPrefix;
    }
}
