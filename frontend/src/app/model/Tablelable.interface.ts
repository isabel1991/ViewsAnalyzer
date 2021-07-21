export interface Tablelable {
    getColumns():string[];
    get(columnIndex:number):any;
}