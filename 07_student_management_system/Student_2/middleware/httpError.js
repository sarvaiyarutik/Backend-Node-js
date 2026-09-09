

class httpError extends Error{
    constructor(massage,statusCode){

        super(massage);
        this.statusCode = statusCode;

    }
}

export default httpError;