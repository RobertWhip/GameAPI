export class GameDto {
    readonly title: string;
    readonly price: number;
    readonly publisher: number;
    readonly tags: string[];
    
    // ISO 8601 Extended format
    // `YYYY-MM-DDTHH:mm:ss.sssZ`
    readonly releaseDate: Date;
}