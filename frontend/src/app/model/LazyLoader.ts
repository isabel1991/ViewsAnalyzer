import { Table } from "./Table";

export class Lazy<K,T extends Table> {
    public id:K;
    
    get():T {
        return null;
    }
}