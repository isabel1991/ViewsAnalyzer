import { Tablelable } from "./Tablelable.interface";
import { User } from "./User";
import { DateFormatter } from "./utils/DateFormatter";

export class View implements Tablelable {

    public id: number;
    public name: string = "";
    public description: string = "";
    public usingFiltroMayores: boolean = false;
    public creationDate: Date;
    public userId: number;
    public stateId: number;
    private currentUser;
    constructor() {
        this.name = "";
        this.description = "";

    }

    getColumns(): string[] {
        return ["Id", "Nombre", "Descripción", "Usa Filtro Mayores", "Creador", "Fecha de creación", "Estado"];
    }

    get(columnIndex: number) {

        switch (columnIndex) {
            case 0:
                return this.id;
            case 1:
                return this.name;
            case 2:
                return this.description;
            case 3:
                return this.usingFiltroMayores;
            case 4:
                if (this.currentUser)
                    return this.userId == this.currentUser.id ? "*Usted*" : this.userId;
                else
                    return this.userId;
            case 5:
                return DateFormatter.dateFormat(this.creationDate);
            case 6:
                return this.stateId;
            default:
                return null;
        }
    }

    public setCurrentUser(user: User) {
        this.currentUser = user;
    }

    public static parse(data: object) {

        try {
            let view: View = new View();

            view.id = data['id'];
            view.name = data['name'];
            view.description = data['description'];
            view.usingFiltroMayores = data['usingFiltroMayores'] == 1;
            view.creationDate = new Date(Number.parseInt(data['creationDate']));
            view.userId = data['userId'];
            view.stateId = data['stateId'];

            return view
        }
        catch (e) {
            return null;
        }
    }
}