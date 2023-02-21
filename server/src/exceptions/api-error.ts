export default class ApiError extends Error {
    status: number | undefined;
    errors:any;

    constructor(status:number, message:string, errors = []) {//
            super(message);
            this.status = status;
            Object.setPrototypeOf(this, ApiError.prototype);
    }
    static UnauthorisedError(){
        return new ApiError(401, 'Пользователь не авторизовани');
    }
    static AuthorisationError(){
        return new ApiError(401, 'Неверный логин или пароль!');
    }
    static BadRequest(message:string, errors = []){
        return new ApiError(200, message, errors);
    }
}
