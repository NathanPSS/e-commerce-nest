-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RECEBIDO', 'ANDAMENTO', 'ENTREGUE', 'FINALIZADO');

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "produto" (
    "codigo" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "clientID" INTEGER NOT NULL,
    "total_pedido" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'RECEBIDO',

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos_em_pedidos" (
    "id_produto" TEXT NOT NULL,
    "id_pedido" INTEGER NOT NULL,

    CONSTRAINT "produtos_em_pedidos_pkey" PRIMARY KEY ("id_pedido","id_produto")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_id_key" ON "cliente"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_em_pedidos" ADD CONSTRAINT "produtos_em_pedidos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_em_pedidos" ADD CONSTRAINT "produtos_em_pedidos_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
