import ErrReqHandler from "../types/ErrReqHandler";
import ResponseInterface from "../interfaces/ResponseInterface";

const errorHandler: ErrReqHandler = (err, _, res, __) => {
  const response: ResponseInterface = {
    statusCode: err.statusCode,
    error: true,
    message: err.message,
  };
  if (err.fieldsRequired) response.fieldsRequired = err.fieldsRequired;

  res.status(err.statusCode).json(response);
};

export default errorHandler;
