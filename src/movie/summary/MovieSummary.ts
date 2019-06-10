import { movieIdCleaner } from '../moviePrefixHelper';

export class MovieSummary {
    public title: string;
    public year: number;
    public id: string;
    public type: string;
    public poster: string;

    constructor(response: any) {
        this.title = response.Title;
        this.year = response.Year;
        this.id = this.populateId(response.ID);
        this.type = response.Type;
        this.poster = response.Poster;
    }

    private populateId = (ID: string) => {
        return movieIdCleaner(ID);
    }
}
