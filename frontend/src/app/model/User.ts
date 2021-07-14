export class User {

    public email:string = "";
    public username:string = "";
    public password:string = "";
    public isAdmin:boolean = false;
    public manager:number = null;
    

    public static parse(data:object) {
        
        try{
            const user:User = new User();

            user.email = data["email"];
            user.username = data["username"];
            user.password = data["password"];
            user.isAdmin = data["isAdmin"]=="1"?true:false;
            user.manager = data["manager"];
            return user;
        }
        catch(e) {
            return null;
        }
    }

    public isValid():boolean {
        return this.username.length>0 && this.password.length>0;
    }
}