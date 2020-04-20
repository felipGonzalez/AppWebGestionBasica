export class LogModel {
    datetime: Date;
    user: String;
    action: String;

    constructor(datetime: Date,user: String,action: String) {
        this.datetime = datetime;
        this.user = user;
        this.action = action
    }
    
}