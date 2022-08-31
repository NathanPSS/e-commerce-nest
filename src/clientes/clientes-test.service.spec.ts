import { Test, TestingModule } from '@nestjs/testing';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service'

import { ExceptionService } from '../exceptions/bad-request-exception/exception.service';


import { ClientesService } from './clientes.service';
import { ConfigService } from '@nestjs/config';
import { IClientBD } from './entities/iClientBD.entity';

let clientes :IClientBD[] = [
  {
    id: 1,
   email: 'irineu@gmai.com',
   nome: 'irineu',
   password: '123456',
   telefone: '982222',
   createdAt: new Date('2022-08-25 13:07:51.688'),
   updateAt: new Date('2022-08-25 13:07:51.711'),
  },
  {
    id: 1,
   email: 'irineia@gmai.com',
   nome: 'irineia',
   password: '123456',
   telefone: '982222',
   createdAt: new Date('2022-08-25 13:07:51.688'),
   updateAt: new Date('2022-08-25 13:07:51.711'),
  }
]


describe('ClientesService', () => {
  let clienteService: ClientesService;
  let prisma :PostgreSqlService
  let exceptions :ExceptionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService,PostgreSqlService,ConfigService,ExceptionService,
       {
        provide: HashDataService,
        useValue:{
         hashData: jest.fn()
        }
       },
      ],
    }).compile();
    exceptions = module.get<ExceptionService>(ExceptionService),
    clienteService = module.get<ClientesService>(ClientesService);
    prisma = module.get<PostgreSqlService>(PostgreSqlService)
  
  });

  it('should be defined', () => {
    expect(clienteService).toBeDefined();
  });
   describe('create',()=>{
  const dto = {
    email: 'irineia@gmail.com',
    password: '123456',
    nome: 'irineia',
    telefone: '982222',
  }
    it('Retornar um cliente',async () => {
        prisma.cliente.create = jest.fn().mockResolvedValueOnce(clientes[0])

        const result = clienteService.create(dto)
        expect(result).resolves.toEqual(clientes[0])
    })
   })
   describe('findOne', ()=>{
    it('Retornar um cliente',async () => {
        const id = 1
        jest.spyOn(prisma.cliente,'findUnique').mockResolvedValueOnce(clientes[0])
        const result = clienteService.findOneById(id)
        expect(result).resolves.toEqual(clientes[0])
    })
   })
  })

