import { Test, TestingModule } from '@nestjs/testing';
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service'
import { CacheGetService } from '../cache/cache-get/cache-get.service'
import { CacheNormalizeService } from '../cache/cache-normalize/cache-normalize.service'
import { ExceptionService } from '../exceptions/bad-request-exception/exception.service';
import { ProdutosService } from './produtos.service';
import { ConfigService } from '@nestjs/config';
import { ProdutoBD } from './entities/IProduto.entity';
import { CreateProdutoApiDto } from './dto/create-api-produto.dto';
import { ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { UpdateApiProdutoDto } from './dto/update-api-produto.dto';



let produtosBD :Array<ProdutoBD> = [
  {
    codigo:'1',
    quantidade: 1,
    nome: 'test',
    descricao: 'test',
    tipo: 'test',
    preco: 1,
    createdAt: new Date('2022-08-25 10:14:26.823'),
    updateAt: new Date('2022-08-25 10:14:26.823')
  },
  {
    codigo:'2',
    quantidade: 2,
    nome: 'test',
    descricao: 'test',
    tipo: 'test',
    preco: 2,
    createdAt: new Date('2022-08-25 10:14:26.823'),
    updateAt: new Date('2022-08-25 10:14:26.823')
  }
]
const dto :CreateProdutoApiDto = {
  codigo:'1111',
  nome:'test',
  descricao:'test',
  preco:1,
  quantidade:1,
  tipo:'test'
}
const updatedDto :CreateProdutoApiDto = {
  codigo:'1112',
  nome:'test1',
  descricao:'test1',
  preco:1,
  quantidade:1,
  tipo:'test'
}
describe('ProdutosService', () => {
  let produtoService: ProdutosService;
  let prisma :PostgreSqlService
  let exceptions :ExceptionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutosService,PostgreSqlService,ConfigService,ExceptionService,
       {
        provide: CacheGetService,
        useValue:{
          get: jest.fn()
        }
       },
       {
        provide: CacheNormalizeService,
        useValue:{
          cacheStringToObject: jest.fn()
        }
       },
      ],
    }).compile();
    exceptions = module.get<ExceptionService>(ExceptionService),
    produtoService = module.get<ProdutosService>(ProdutosService);
    prisma = module.get<PostgreSqlService>(PostgreSqlService)
  
  });

  it('should be defined', () => {
    expect(produtoService).toBeDefined();
  });
  describe('CRUD dos Produtos', () =>{
    it('Criar um produto',async () => {
      const data = await produtoService.createByAPI(dto)
    const result = {
      codigo: data.codigo,
      nome:data.nome,
      descricao:data.descricao,
      preco:data.preco,
      quantidade:data.quantidade,
      tipo:data.tipo,
    }
      expect(result).toEqual(dto)
    })
    it('Retornar um produto',async () => {
      const data = await produtoService.findOne('1111')
      const result = {
        codigo: data.codigo,
        nome:data.nome,
        descricao:data.descricao,
        preco:data.preco,
        quantidade:data.quantidade,
        tipo:data.tipo,
      }
      expect(result).toEqual(dto)
    })
    it('Error ao tentar retornar o produto',async () =>{
   await expect(produtoService.findOne('999999999999999999')).rejects.toThrowError()
    })
  });
  describe('findAll', ()=>{
    it('Retorna uma Lista de Produtos',async () => {
      const result =  await produtoService.findAll()
      expect(result).toBeInstanceOf(Array<ProdutoBD>)

    })
    }),
    it('Deve retornar o produto atualizado',async () => {
      const data = await produtoService.updateByApi(dto.codigo,updatedDto)
      const result = {
        codigo: data.codigo,
        nome:data.nome,
        descricao:data.descricao,
        preco:data.preco,
        quantidade:data.quantidade,
        tipo:data.tipo,
      }
     expect(result).toEqual(updatedDto)
    })
    describe('delete', () =>{
      it('Deve Retornar um produto deletado',async () => {
        const data = await produtoService.remove('1112')
        const result = {
          codigo: data.codigo,
          nome:data.nome,
          descricao:data.descricao,
          preco:data.preco,
          quantidade:data.quantidade,
          tipo:data.tipo,
        }
        expect(result).toEqual(updatedDto)
      })
    })
  })

