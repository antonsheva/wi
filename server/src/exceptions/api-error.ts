export default class ApiError extends Error {
    status: number | undefined;
    errors:any;
    constructor(status:number, message:string, errors = []) {
        try{
            console.log(".....................")
            console.log(message)
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=")
            super(message);
            this.status = status;
            this.errors = errors;
        }catch (e){
            console.log("*+*+*+*+*+*+*+*+*+*++*+*+*+*+")
            console.log(e);
            console.log("|||||||||||||||||||||||||||")
        }


    }
    static UnauthorisedError(){
        return new ApiError(401, 'Пользователь не авторизовани');
    }
    static BadRequest(message:string, errors = []){
        console.log("---------------------")

        return new ApiError(400, message, errors);
    }
}
