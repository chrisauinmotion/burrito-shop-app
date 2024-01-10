import { Request, Response } from 'express';
import * as orderService from '../services/order';

export const createOrder = async (req: Request, res: Response) => {
  const { totalCost, items } = req.body;
  const order = await orderService.createOrder(totalCost, items);
  res.json(order);
};

export const getOrder= async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const account = await orderService.getOrder(orderId);
  res.json(account);
};