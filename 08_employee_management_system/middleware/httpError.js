class httpError extends Error{
    constructor(message,statusCOde){
        super(message);
        this.statusCOde = statusCOde;
    }
}

export default httpError;