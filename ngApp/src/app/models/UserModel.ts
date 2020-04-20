import { RolModel } from './RolModel';

export class UserModel {
    _id:String;
    username: String;
    password: String;
    rol: RolModel;
    status: Boolean     

    constructor(username: String,password: String, rol: RolModel,status: Boolean) {
        this.username= username;
        this.password = password;
        this.rol = rol;
        this.status = status
    }
}
