import { Injectable, UseGuards } from '@nestjs/common';
import { PostgreSqlService } from 'src/clients/postgree-service/postgree-service.service';
import { ExceptionService } from 'src/exceptions/bad-request-exception/exception.service';
import { HashDataService } from 'src/hash/hash-data/hash-data.service';
import { CheckAdminAuthenticationGuard } from './auth-admin/guards/check-admin.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminBD } from './entities/admin.entity';



@Injectable()
export class AdminService {
  constructor(
    private readonly BD :PostgreSqlService,
    private readonly encrypt :HashDataService,
    private readonly execptions :ExceptionService,
  ){}
  async create(createAdminDto: CreateAdminDto) :Promise<AdminBD>{
    createAdminDto.password = await this.encrypt.hashData(createAdminDto.password,10)
    const admin :AdminBD= await this.BD.admin.create({
      data:createAdminDto
    })
    return admin
  }
  findAll() {
    return `This action returns all admin`;
  }

 async findOne(username: string) :Promise<AdminBD>{
  try{
   const admin :AdminBD = await this.BD.admin.findUniqueOrThrow({
    where:{
        username: username
    }
   }) 
   return admin
  }catch(error) {
      this.execptions.throwNotFoundException('','Administrador não encontrado')
  }
  }
  async findOneById(id: number) :Promise<AdminBD>{
    try{
     const admin :AdminBD = await this.BD.admin.findUniqueOrThrow({
      where:{
          id: id
      }
     }) 
     return admin
    }catch(error) {
        this.execptions.throwNotFoundException('','Administrador não encontrado')
    }
    }
 async update(id: number, updateAdminDto: UpdateAdminDto) :Promise<AdminBD>{
  if(updateAdminDto.password !== undefined){
    updateAdminDto.password = await this.encrypt.hashData(updateAdminDto.password,10)
  }
    const updatedAdmin = await this.BD.admin.update({
      where: {
        id: id
      },
      data: updateAdminDto
    })
    return updatedAdmin
  }

 async remove(id: number) :Promise<AdminBD>{
    const removedAdmin = await this.BD.admin.delete({
      where:{
        id: id
      }
    })
    return removedAdmin
  }
}
