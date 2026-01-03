/*
  Warnings:

  - Added the required column `action` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Action" AS ENUM ('BUY', 'SELL');

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "action" "Action" NOT NULL;
