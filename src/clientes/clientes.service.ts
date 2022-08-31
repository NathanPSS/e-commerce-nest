import { Injectable } from '@nestjs/common';
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service';
import { ExceptionService } from '../exceptions/bad-request-exception/exception.service'
import { HashDataService } from '../hash/hash-data/hash-data.service'
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { IClientBD } from './entities/iClientBD.entity';


@Injectable()
export class ClientesService {
  constructor(
    private BD : PostgreSqlService,
    private encrypt : HashDataService,
    private execeptions :ExceptionService
  ){}
  async create(createClienteDto: CreateClienteDto) :Promise<IClientBD>{
   const {email,nome,password,telefone} = createClienteDto
   
   const hashedPassword = await this.encrypt.hashData(password,10)
try{
   const userCreated : IClientBD= await this.BD.cliente.create({
      data: {
        email: email,
        telefone: telefone,
        nome: nome,
        password: hashedPassword
      }
    })
    return userCreated
  } catch (error){
    if(error.code == 'P2002'){
      this.execeptions.throwForbiddenException('Email já cadastrado')
    }
  } 
  }

 async findAll() :Promise<IClientBD[]>{
    const users : IClientBD[]= await this.BD.cliente.findMany({})
    
    return users
  }

  async findOneById(id :number) :Promise<IClientBD | void>{
    try{
    const user :IClientBD = await this.BD.cliente.findUniqueOrThrow({
      where:{
        id: id
      }
    })
    return user
  } catch(error) {
    console.log(error)
   return this.execeptions.throwNotFoundException()
  }
  }
  
  async findOneByEmail(email :string) :Promise<IClientBD | null>{
    
    const user :IClientBD = await this.BD.cliente.findUnique({
      where:{
        email: email
      }
    })
    return user
  }
  async update(id: number, updateClienteDto: UpdateClienteDto) :Promise<IClientBD>{
    if(updateClienteDto.password !== undefined){
      updateClienteDto.password = await this.encrypt.hashData(updateClienteDto.password,10)
    }
    const clienteAtualizado = await this.BD.cliente.update({
      where:{
        id: id
      },
      data: updateClienteDto
    })
    return clienteAtualizado
  }

 async remove(id: number) :Promise<IClientBD>{
    const removedCliente = await this.BD.cliente.delete({
      where:{
        id: id
      }
    })
    return removedCliente
  }
}
