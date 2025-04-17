-- CreateEnum
CREATE TYPE "SetStatus" AS ENUM ('ACTIVE', 'RETIRED', 'DISCONTINUED');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'NEW_SEALED', 'USED_COMPLETE', 'USED_INCOMPLETE', 'USED');

-- CreateTable
CREATE TABLE "LegoSet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "pieces" INTEGER NOT NULL,
    "minifigs" INTEGER,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegoSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "legoSetId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "condition" "Condition" NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "seller" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "legoSetId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "condition" "Condition" NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "buyer" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "legoSetId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "condition" "Condition" NOT NULL,
    "location" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_legoSetId_fkey" FOREIGN KEY ("legoSetId") REFERENCES "LegoSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_legoSetId_fkey" FOREIGN KEY ("legoSetId") REFERENCES "LegoSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_legoSetId_fkey" FOREIGN KEY ("legoSetId") REFERENCES "LegoSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
