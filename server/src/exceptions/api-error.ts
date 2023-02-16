export default class ApiError extends Error {
    status: number | undefined;
    errors:any;

    constructor(status:number, message:string, errors = []) {
            super(message);
    }
    static UnauthorisedError(){
        return new ApiError(401, 'Пользователь не авторизовани');
    }
    static BadRequest(message:string, errors = []){
        console.log("---------------------")
        return new ApiError(400, message, errors);
    }
}
