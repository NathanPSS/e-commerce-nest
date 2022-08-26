-- DropForeignKey
ALTER TABLE "produtos_em_pedidos" DROP CONSTRAINT "produtos_em_pedidos_id_pedido_fkey";

-- DropForeignKey
ALTER TABLE "produtos_em_pedidos" DROP CONSTRAINT "produtos_em_pedidos_id_produto_fkey";

-- AddForeignKey
ALTER TABLE "produtos_em_pedidos" ADD CONSTRAINT "produtos_em_pedidos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("codigo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_em_pedidos" ADD CONSTRAINT "produtos_em_pedidos_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;
