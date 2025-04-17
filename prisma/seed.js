import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Création de quelques sets LEGO de test
  const sets = await Promise.all([
    prisma.legoSet.create({
      data: {
        setNumber: '75313',
        name: 'AT-AT',
        theme: 'Star Wars',
        year: 2021,
        pieces: 1267,
        minifigs: 9,
        retailPrice: 159.99,
        status: 'ACTIVE',
      },
    }),
    prisma.legoSet.create({
      data: {
        setNumber: '10283',
        name: 'NASA Space Shuttle Discovery',
        theme: 'NASA',
        year: 2021,
        pieces: 2354,
        minifigs: 0,
        retailPrice: 199.99,
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log('Sets créés:', sets);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 