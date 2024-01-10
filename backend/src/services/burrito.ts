import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBurritos = async () => {
  const burritos = await prisma.burrito.findMany({
    include: {
      options: true
    }
  });
  return burritos;
};