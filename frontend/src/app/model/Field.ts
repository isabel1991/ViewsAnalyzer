
export class Field<T> {
    public id: any;
    public name: string;
    public description: string;
    public value: T;

    public isEditable: boolean;
    public isVisible: boolean;

    constructor(name: string, description: string, value: T = null, isEditable: boolean = true, isVisible: boolean = true) {
        this.name = name;
        this.description = description;

        this.value = value;

        if (isEditable)
            this.isEditable = isEditable;
        if (isVisible)
            this.isVisible = isVisible;

    }

}