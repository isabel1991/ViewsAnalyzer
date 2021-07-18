import { Field } from "./Field";
import { Lazy } from "./LazyLoader";
import { State } from "./State";
import { Table } from "./Table";
import { User } from "./User";

export class View extends Table{

    public id: Field<number> = new Field("id","Id");
    public name: Field<string> = new Field("name","Nombre", "");
    public description: Field<string> = new Field("description","Descripción", "");
    public usingFiltroMayores: Field<boolean> = new Field("usingFiltroMayores","Usa Filtro Mayores", false);
    public creationDate: Field<Date> = new Field("creationDate","Fecha creación", null);
    public userId:Lazy<number,User> = new Lazy();
    public stateId: Field<State> = new Field("state","Estado", null);

    constructor() {
        super();

    }

    public static parse(data: object) {

        try {
            let view: View = new View();

            view.id.value = data['id'];
            view.name.value = data['name'];
            view.description.value = data['description'];
            view.usingFiltroMayores.value = data['usingFiltroMayores'] == 1;
            view.creationDate.value = new Date(data['creationDate']);
            view.userId.id = data['userId'];
            view.stateId.value = data['stateId'];

            return view
        }
        catch (e) {
            return null;
        }
    }
}