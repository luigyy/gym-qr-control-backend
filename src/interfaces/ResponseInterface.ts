import UserInterface from "./UserInterface";

export default interface ResponseInterface {
  fieldsRequired?: string[];
  statusCode: number;
  error: boolean;
  message: string;
  data?: {
    token?: string;
    userData?: Array<UserInterface>;
  };
}
