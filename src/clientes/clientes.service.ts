import { Injectable } from '@nestjs/common';
import { PostgreSqlService } from 'src/clients/postgree-service/postgree-service.service';
import { ExceptionService } from 'src/exceptions/bad-request-exception/exception.service';
import { CompareHashDataService } from 'src/hash/compare-hash-data/compare-hash-data.service';
import { HashDataService } from 'src/hash/hash-data/hash-data.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { IClientBD } from './entities/iClientBD.entity';


@Injectable()
export class ClientesService {
  constructor(
    private BD : PostgreSqlService,
    private encrypt : HashDataService,
  ){}
  async create(createClienteDto: CreateClienteDto) :Promise<IClientBD>{
   const {email,nome,password,telefone} = createClienteDto
   
   const hashedPassword = await this.encrypt.hashData(password,10)

   const userCreated : IClientBD= await this.BD.cliente.create({
      data: {
        email: email,
        telefone: telefone,
        nome: nome,
        password: hashedPassword
      }
    })
    return userCreated
  }

 async findAll() :Promise<IClientBD[]>{
    const users : IClientBD[]= await this.BD.cliente.findMany({})
    
    return users
  }

  async findOne(email: string) :Promise<IClientBD | null>{
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
