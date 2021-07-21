export class Utils {


    public static isList(element: any) {
        if (!element)
            return false;

        const keys = Object.keys(element);
        let isNaN = false;

        for (let i = 0; i < keys.length && !isNaN; i++) {
            if (!(Number.parseInt(keys[i]))) {
                isNaN = true;
            }
        }
        return isNaN;

    }
}