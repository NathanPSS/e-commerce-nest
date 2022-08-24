/*
  Warnings:

  - You are about to drop the column `naoseimais` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `pedidototal` on the `pedido` table. All the data in the column will be lost.
  - Added the required column `pedido_total` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedido" DROP COLUMN "naoseimais",
DROP COLUMN "pedidototal",
ADD COLUMN     "pedido_total" DOUBLE PRECISION NOT NULL;
