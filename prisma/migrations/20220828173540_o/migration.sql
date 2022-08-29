/*
  Warnings:

  - Added the required column `quantidadeEmPedido` to the `produtos_em_pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos_em_pedidos" ADD COLUMN     "quantidadeEmPedido" INTEGER NOT NULL;
