export class ErrorGlobal{
    constructor(msg,show,type){
        this.type = type
        this.status = show
        this.msg = msg
    }
    updateMsg(message){
        this.msg = message
    }
}
