// CustomError.ts
interface ErrorResponse {
    message: string;
    field?: string;
  }
  
  export abstract class CustomError extends Error {
    abstract statusCode: number;
  
    constructor(message: string) {
      super(message);
      // Set the prototype explicitly
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  
    abstract serializeErrors(): ErrorResponse[];
  }
  
  export class BadRequestError extends CustomError {
    statusCode = 400;
  
    constructor(public message: string) {
      super(message);
      // Set the prototype explicitly
      Object.setPrototypeOf(this, BadRequestError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.message }];
    }
  }
  
  export class NotFoundError extends CustomError {
    statusCode = 404;
  
    constructor(public message: string) {
      super(message);
      // Set the prototype explicitly
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.message }];
    }
  }
  
  export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    status = 'error';
  
    constructor(message: string) {
      super(message);
    }
    serializeErrors() {
        return [{ message: this.message }];
      }
  }

  export class ServerError extends CustomError {
    statusCode = 500;
    status = 'error';
  
    constructor(message: string) {
      super(message);
    }
    serializeErrors() {
        return [{ message: this.message }];
      }
  }