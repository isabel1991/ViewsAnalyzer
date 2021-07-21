import { DatePipe } from "@angular/common";

export class DateFormatter {

    public static dateFormat(date: Date):string {
        try {

            let pipe = new DatePipe('en-US');

            return pipe.transform(date,'dd/MM/yyyy h:mm a');

            // const day = date && date.getDate() || -1;
            // const dayWithZero = day.toString().length > 1 ? day : '0' + day;
            // const month = date && date.getMonth() + 1 || -1;
            // const monthWithZero = month.toString().length > 1 ? month : '0' + month;
            // const year = date && date.getFullYear() || -1;

            // return `${year}-${monthWithZero}-${dayWithZero}`;
        }
        catch(e){
            console.log("error: ",e);
            
            return null;
        }
    }
}