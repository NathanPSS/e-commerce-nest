import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBasicAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedRequestSwagger } from 'src/helpers/swagger/UnthorizadedSwagger';
import { AdminService } from './admin.service';
import { CheckAdminAuthenticationGuard } from './auth-admin/guards/check-admin.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminBD } from './entities/admin.entity';


@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @ApiOperation({summary: 'Cria um Admin'})
  @ApiResponse({status: 201,description: 'Criado um Admin',type: AdminBD})
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
 @UseGuards(CheckAdminAuthenticationGuard)
 @ApiOperation({summary: 'Atualiza um Admin'})
 @ApiBasicAuth('basic')
 @ApiResponse({status: 200,description:'Admin atualizado com sucesso',type: AdminBD})
 @ApiResponse({status: 401,description: 'Admin não logado', type: UnauthorizedRequestSwagger})
  @Get('update')
  update(@Req() req: any, @Body() updateAdminDto: UpdateAdminDto) {
    const id = req.user.admin
    return this.adminService.update(+id, updateAdminDto);
  }
  @UseGuards(CheckAdminAuthenticationGuard)
  @ApiOperation({summary: 'Remove um Admin'})
  @ApiBasicAuth('basic')
  @ApiResponse({status: 401,description: 'Admin não logado', type: UnauthorizedRequestSwagger})
  @ApiResponse({status: 200,description: 'Admin Removido'})
  @Get('delete')
  remove(@Req() req: any) {
    const id = req.user.admin
    return this.adminService.remove(+id);
  }
}
