class httpError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCodec = statusCode;  
    }
}

export default httpError;