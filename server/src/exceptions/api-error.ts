export default class ApiError extends Error {
    status: number | undefined;
    errors:any;

    constructor(status:number, message:string, errors = []) {//
        super(message);

        this.status = status;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    static UnauthorisedError(){
        return new ApiError(401, 'Пользователь не авторизовани');
    }

    static BadRequest(message:string, errors = []){
        console.log('---BadRequest---')
        return  new ApiError(401, message, errors);
    }
    static AuthorisationError(){
        console.log('---AuthorisationError---')
        return new ApiError(401, 'Неверный логин или пароль!');
    }
}
