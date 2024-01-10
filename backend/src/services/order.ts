import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (totalCost: number, items: { burritoId: string; options: { id: string }[] }[]) => {
  const openedAccount = await prisma.order.create({
    data: {
      totalCost,
      items: {
        create: items.map(item => ({
          burritoId: item.burritoId,
          options: {
            connect: item.options.map(({ id }) => ({ id }))
          }
        }))
      }  
    },
  });
  return openedAccount;
};

export const getOrder = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  })

  if (!order) {
    throw Error("The order for this request was not found");
  }

  return order;
};
