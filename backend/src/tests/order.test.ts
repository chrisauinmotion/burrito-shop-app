import { PrismaClient } from '@prisma/client';
import { createOrder, getOrder } from '../services/order';

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    order: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mockPrisma),
  };
});

const prisma = new PrismaClient() as unknown as {
  order: {
    create: jest.Mock;
    findUnique: jest.Mock;
  };
};

describe('Order Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createOrder creates an order', async () => {
    const totalCost = 100;
    const items = [
      { burritoId: '1', options: [{ id: 'option1' }] },
      { burritoId: '2', options: [{ id: 'option2' }] },
    ];

    const mockOrder = { id: '1', totalCost, items };

    prisma.order.create.mockResolvedValue(mockOrder);

    const order = await createOrder(totalCost, items);

    expect(order).toEqual(mockOrder);
    expect(prisma.order.create).toHaveBeenCalledWith({
      data: {
        totalCost,
        items: {
          create: items.map(item => ({
            burritoId: item.burritoId,
            options: {
              connect: item.options.map(({ id }) => ({ id })),
            },
          })),
        },
      },
    });
  });

  it('getOrder fetches an order by id', async () => {
    const orderId = '1';
    const mockOrder = { id: orderId, totalCost: 100, items: [] };

    prisma.order.findUnique.mockResolvedValue(mockOrder);

    const order = await getOrder(orderId);

    expect(order).toEqual(mockOrder);
    expect(prisma.order.findUnique).toHaveBeenCalledWith({
      where: { id: orderId },
    });
  });
});