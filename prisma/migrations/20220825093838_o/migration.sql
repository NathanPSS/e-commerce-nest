/*
  Warnings:

  - Added the required column `tipo` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('PERFUME', 'COSMETICOS');

-- AlterTable
ALTER TABLE "pedido" ADD COLUMN     "tipo" "Tipo" NOT NULL;
