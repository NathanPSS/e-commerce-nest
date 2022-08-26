/*
  Warnings:

  - You are about to drop the column `tipo` on the `pedido` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedido" DROP COLUMN "tipo";

-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "tipo" TEXT NOT NULL;
