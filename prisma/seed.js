import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Lego Sets
  const legoSets = await Promise.all([
    prisma.legoSet.create({
      data: {
        name: "NASA Space Shuttle Discovery",
        year: 2021,
        pieces: 2354,
        minifigs: 0,
        image: "https://www.lego.com/cdn/cs/set/assets/blt1b0c1b0b0b0b0b0b/10283.jpg",
      },
    }),
    prisma.legoSet.create({
      data: {
        name: "Titanic",
        year: 2021,
        pieces: 9090,
        minifigs: 0,
        image: "https://www.lego.com/cdn/cs/set/assets/blt1b0c1b0b0b0b0b0b/10294.jpg",
      },
    }),
  ]);

  // Create Purchases
  await Promise.all([
    prisma.purchase.create({
      data: {
        legoSetId: legoSets[0].id,
        price: 199.99,
        quantity: 1,
        condition: "NEW",
        purchaseDate: new Date("2021-04-01"),
        seller: "LEGO Store",
      },
    }),
    prisma.purchase.create({
      data: {
        legoSetId: legoSets[1].id,
        price: 629.99,
        quantity: 1,
        condition: "NEW_SEALED",
        purchaseDate: new Date("2021-11-01"),
        seller: "LEGO Store",
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 