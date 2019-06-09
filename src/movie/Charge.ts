export class Charge {
    public provider: string;
    public cost: number;

    constructor(provider: string, cost: number) {
        this.provider = this.providerForId(provider);
        this.cost = cost;
    }
    public providerForId = (movieId: string): string => {
        if (movieId.startsWith('cw')) {
            return  'Cinema World';
        }
        return 'Film World';
    }
}
