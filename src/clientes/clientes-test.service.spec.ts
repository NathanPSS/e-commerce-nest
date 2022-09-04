import { Test, TestingModule } from '@nestjs/testing';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service'

import { ExceptionService } from '../exceptions/bad-request-exception/exception.service';


import { ClientesService } from './clientes.service';
import { ConfigService } from '@nestjs/config';
import { IClientBD } from './entities/iClientBD.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

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
const dto :CreateClienteDto= {
  email: 'teste@gmail.com',
  password: '123456',
  nome: 'teste',
  telefone: '999982222',
}
const dtoExpect = {
  email: 'teste@gmail.com',
  nome: 'teste',
  telefone: '999982222',
}
describe('ClientesService', () => {
  let clienteService: ClientesService;
  let prisma :PostgreSqlService
  let exceptions :ExceptionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService,PostgreSqlService,ConfigService,ExceptionService,HashDataService
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
    it('Criar um Cliente',async () => {
      const data = await clienteService.create(dto)
      const result= {
        email: data.email,
        nome: data.nome,
        telefone: data.telefone
      }
      expect(result).toEqual(dtoExpect)
    })
   })
   describe('findOne', ()=>{
    it('Retornar um cliente',async () => {
      const email = 'teste@gmail.com'
        const data = await clienteService.findOneByEmail(email)
        const result= {
          email: data.email,
          nome: data.nome,
          telefone: data.telefone
        }
        expect(result).toEqual(dtoExpect)
    })
   })
   describe('deletar um cliente', () =>{
    it('Deletar um cliente', async () => {
      const email = 'teste@gmail.com'
      const data = await clienteService.removeByEmail(email)
      const result= {
        email: data.email,
        nome: data.nome,
        telefone: data.telefone
      }
      expect(result).toEqual(dtoExpect)
    })
   })
  })

