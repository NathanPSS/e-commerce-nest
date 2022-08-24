/*
  Warnings:

  - Added the required column `pedidototal` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedido" ADD COLUMN     "pedidototal" DOUBLE PRECISION NOT NULL;
