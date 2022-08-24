/*
  Warnings:

  - Added the required column `naoseimais` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedido" ADD COLUMN     "naoseimais" DOUBLE PRECISION NOT NULL;
