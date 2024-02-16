class CodedError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
    }
}