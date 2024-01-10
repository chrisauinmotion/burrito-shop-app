import { Request, Response } from 'express';
import * as burritoService from '../services/burrito';

export const getBurritos = async (req: Request, res: Response) => {
  const burritos = await burritoService.getBurritos();
  res.json(burritos);
};