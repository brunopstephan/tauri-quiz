export type Collection = {
    id: number;
    name: string;
    words: Word[];
}

export type Word = {
    id: number;
    word: string;
    definition: string;
    collection_id: string;
}