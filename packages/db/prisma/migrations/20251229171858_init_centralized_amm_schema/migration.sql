/*
  Warnings:

  - You are about to drop the column `buyerId` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `lockedBalance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `noPool` to the `Market` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yesPool` to the `Market` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountIn` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountOut` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "feePercent" DOUBLE PRECISION NOT NULL DEFAULT 0.3,
ADD COLUMN     "noPool" INTEGER NOT NULL,
ADD COLUMN     "yesPool" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "buyerId",
DROP COLUMN "quantity",
DROP COLUMN "sellerId",
ADD COLUMN     "amountIn" INTEGER NOT NULL,
ADD COLUMN     "amountOut" INTEGER NOT NULL,
ADD COLUMN     "side" "Outcome" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lockedBalance";

-- DropTable
DROP TABLE "Order";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "OrderType";

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "yesShares" INTEGER NOT NULL DEFAULT 0,
    "noShares" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Position_userId_marketId_key" ON "Position"("userId", "marketId");

-- CreateIndex
CREATE INDEX "Trade_userId_idx" ON "Trade"("userId");

-- CreateIndex
CREATE INDEX "Trade_marketId_idx" ON "Trade"("marketId");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
