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
  describe('findOne', () =>{
    it('Retornar um produto',async () => {
      prisma.produto.findUniqueOrThrow = jest.fn().mockResolvedValueOnce(produtosBD[0])
      const result = await produtoService.findOne('1')
      expect(result).toEqual(produtosBD[0])
    })
    it('Error ao tentar retornar o produto',async () =>{
      jest.spyOn(prisma.produto,'findUniqueOrThrow').mockRejectedValueOnce(new Error())
   await expect(produtoService.findOne('1')).rejects.toThrowError()
    })
  });
  describe('create',()=>{
    it('Criar um produto',async () => {
      prisma.produto.create = jest.fn().mockResolvedValueOnce(produtosBD[0])
      const dto :CreateProdutoApiDto = {
        codigo:'1111',
        nome:'test',
        descricao:'test',
        preco:1,
        quantidade:1,
        tipo:'test'
      }
      const result = await produtoService.createByAPI(dto)
      expect(result).toEqual(produtosBD[0])
    })
  }),
  describe('findAll', ()=>{
    it('Retorna uma Lista de Produtos',async () => {
      prisma.produto.findMany = jest.fn().mockResolvedValueOnce(produtosBD)
      const result =  produtoService.findAll()
      expect(result).resolves.toEqual(produtosBD)

    })
    }),
    describe('delete', () =>{
      it('Deve Retornar um produto deletado',async () => {
        prisma.produto.delete = jest.fn().mockResolvedValueOnce(produtosBD[0])
        const result = produtoService.remove('1')
        expect(result).resolves.toEqual(produtosBD[0])
      })
    }),
    describe('update', () =>{
      const codigo = '2'
      const updateDto :UpdateApiProdutoDto = {
        codigo: '2',
        quantidade: 1,
        nome:'test',
        descricao:'test',
        preco:1,
      }
      it('Deve retornar o produto atualizado',async () => {
        prisma.produto.update = jest.fn().mockResolvedValueOnce(produtosBD[0])
        const result = produtoService.updateByApi(codigo,updateDto)
       await expect(result).resolves.toEqual(produtosBD[0])
      })
    })
  })

