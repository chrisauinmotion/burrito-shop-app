import express from 'express';
import * as orderController from '../controllers/order';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/:orderId', orderController.getOrder);

export default router;