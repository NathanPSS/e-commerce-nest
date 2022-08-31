import { Response } from "express";
import { ProdutosService } from "./produtos/produtos.service";
export declare class HomeController {
    private readonly produtosService;
    constructor(produtosService: ProdutosService);
    home(res: Response): Promise<void>;
}
