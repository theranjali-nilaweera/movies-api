import {Ticket} from './Ticket';

export class MovieDetail {
    public rated: string;
    public released: string;
    public runtime: string;
    public genre: string;
    public director: string;
    public writer: string;
    public actors: string;
    public plot: string;
    public language: string;
    public country: string;
    public awards: string;
    public metascore: number;
    public rating: number;
    public votes: number;
    public id: string;
    public type: string;
    public prices: Ticket[];
    public price: number;

        constructor(response: any) {
        // if (typeof response == 'undefined' || response == null){ return; }
        this.rated = response.Rated;
        this.released = response.Released;
        this.runtime = response.Runtime;
        this.genre = response.Genre;
        this.director = response.Director;
        this.writer = response.Writer;
        this.actors = response.Actors;
        this.plot = response.Plot;
        this.language = response.Language;
        this.country = response.Country;
        this.awards = response.Awards;
        this.metascore = response.Metascore;
        this.rating = response.Rating;
        this.votes = response.Votes;
        this.id = response.ID;
        this.type = response.Type;
        this.price = response.Price;
        this.prices = new Array<Ticket>();

    }

    public populatePrice(value: Ticket[]) {
        this.prices = value;
    }
}
