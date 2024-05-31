import express from 'express';
import { userController } from './User.controller';
const router = express.Router()

router.post('/', userController.userPost)


export const userRoute = router


