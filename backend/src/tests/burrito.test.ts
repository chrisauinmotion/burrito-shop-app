import { PrismaClient } from '@prisma/client';
import { getBurritos } from '../services/burrito';

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    burrito: {
      findMany: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mockPrisma),
  };
});

const prisma = new PrismaClient() as unknown as {
  burrito: {
    findMany: jest.Mock;
  };
};

describe('Burrito Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getBurritos fetches all burritos with options', async () => {
    const mockBurritos = [
      { id: '1', name: 'Burrito 1', options: [{ id: 'option1', name: 'Option 1' }] },
      { id: '2', name: 'Burrito 2', options: [{ id: 'option2', name: 'Option 2' }] },
    ];

    prisma.burrito.findMany.mockResolvedValue(mockBurritos);

    const burritos = await getBurritos();

    expect(burritos).toEqual(mockBurritos);
    expect(prisma.burrito.findMany).toHaveBeenCalledWith({
      include: { options: true },
    });
  });
});