import { Option, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const burritoOptions = [
    {
      name: "WHITE RICE",
      imageSrc: "/white-rice.jpeg",
      cal: 210,
    },
    {
      name: "GUACAMOLE",
      imageSrc: "/guac.jpeg",
      cal: 230,
    },
    {
      name: "PINTO BEANS",
      imageSrc: "/pinto-beans.jpeg",
      cal: 130,
    },
    {
      name: "SOUR CREAM",
      imageSrc: "/sour-cream.jpeg",
      cal: 110,
    },
  ];

  const burritoMockData = [
    {
      name: "CARNE ASADA",
      price: 13.25,
      cal: 250,
      imageSrc: "/carne-asada-burrito.jpeg",
      options: burritoOptions,
    },
    {
      name: "CHICKEN",
      price: 10.25,
      cal: 180,
      imageSrc: "/chicken-burrito.jpeg",
      options: burritoOptions,
    },
    {
      name: "STEAK",
      price: 11.95,
      cal: 150,
      imageSrc: "/steak-burrito.jpeg",
      options: burritoOptions,
    },
    {
      name: "BARBACOA",
      price: 11.95,
      cal: 170,
      imageSrc: "/barbacoa-burriito.jpeg",
      options: burritoOptions,
    },
  ];

  let options: Option[] = [];
  for (const option of burritoOptions) {
    const newOption = await prisma.option.create({ data: option });
    options.push(newOption);
  }

  for (const burrito of burritoMockData) {
    await prisma.burrito.create({
      data: {
        ...burrito,
        options: {
          connect: options?.map(({ id }) => ({ id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });