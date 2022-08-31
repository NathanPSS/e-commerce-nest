import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoBD, ProdutoId } from './entities/IProduto.entity';
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
export declare class ProdutosController {
    private readonly produtosService;
    private readonly adminService;
    constructor(produtosService: ProdutosService, adminService: AdminService);
    create(createProdutoDto: CreateProdutoDto): Promise<ProdutoBD>;
    renderDashboardAdmin(res: Response, req: any): Promise<void>;
    update(updateProdutoDto: UpdateProdutoDto): Promise<ProdutoBD>;
    remove(codigo: ProdutoId): Promise<void | ProdutoBD>;
}
