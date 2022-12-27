
class HttpException extends Error {
  statusCode: number;
  message: string;
  fieldsRequired?: string[];

  constructor(statusObject: {code: number, message: string}, fieldsRequired?: string []) {
    super();
    this.statusCode = statusObject.code;
    this.message = statusObject.message;
    this.fieldsRequired = fieldsRequired;
  }
}
 
export default HttpException;
