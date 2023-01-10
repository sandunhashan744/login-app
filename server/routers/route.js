import { Router } from "express";
import * as controller from '../controllers/appcontroller.js';
import Auth,{localVariables} from "../middleware/auth.js";
// import mailler
import {registerMail} from '../controllers/mailler.js'

const router = Router();

// POST End points
router.route('/register').post(controller.register); //register User
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser,(req, res) => res.end());
router.route('/login').post(controller.verifyUser,controller.login);

// GET End points
router.route('/getUser/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

// PUT End Points
router.route('/updateUser').put(Auth,controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetpassword);

export default router;