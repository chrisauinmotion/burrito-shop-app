import express from 'express';
import * as burritoController from '../controllers/burrito';

const router = express.Router();

router.get('/', burritoController.getBurritos);

export default router;