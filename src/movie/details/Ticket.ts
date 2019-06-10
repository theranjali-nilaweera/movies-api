export class Ticket {
    public provider: string;
    public cost: number;

    constructor(movieId: string, cost: number) {
        this.provider = this.providerForId(movieId);
        this.cost = cost;
    }
    public providerForId = (movieId: string): string => {
        if (movieId.startsWith('cw')) {
            return  'Cinema World';
        }
        return 'Film World';
    }
}
