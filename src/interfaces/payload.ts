import { ObjectId } from 'mongoose';

interface payload {
  id: ObjectId;
  name: string;
  email: string;
}

export default payload;
