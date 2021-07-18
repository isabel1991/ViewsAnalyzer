export interface Tablelable {
    getColumns():object[];
    get(columnName:string):any;
}