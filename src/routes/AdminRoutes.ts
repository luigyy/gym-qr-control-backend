import express from 'express';

import {
  getUsers
} from '../controllers/adminController';

const router = express.Router(); 

//test
router.get('/usersData', getUsers);

export default router;
