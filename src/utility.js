export const port = 8000;
export const frontendDir = "../front-end"

BigInt.prototype.toJSON = function() { return this.toString() }

export function inLogger(request) {
    const date = new Date();
    console.log(`IN ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}|${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}  [${request.method}] ${request.originalUrl}`);
}

export function outLogger(request) {
    const date = new Date();
    console.log(`OUT ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}|${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}  [${request.method}] ${request.originalUrl}`);
}